import React, {
	createContext,
	ReactNode,
	useContext,
	useState,
	useEffect,
} from "react";
import { REACT_NATIVE_CLIENT_ID } from "react-native-dotenv";
import asyncStorage from "@react-native-async-storage/async-storage";
import { startAsync } from "expo-auth-session";
import { api } from "../services/api";

interface User {
	id: string;
	login: string;
	name: string;
	avatarUrl: string;
}

interface AuthContextData {
	user: User | null;
	isSigningIn: boolean;
	signIn: () => Promise<void>;
	signOut: () => void;
}

interface AuthResponse {
	token: string;
	user: User;
}

interface AuthorizationResponse {
	params: {
		code?: string;
		error?: string;
	};
	type?: string;
}

interface Props {
	children: ReactNode;
}

const USER_STORAGE = "@nlwheat:user";
const TOKEN_STORAGE = "@nlwheat:token";

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: Props) => {
	const [isSigningIn, setIsSigningIn] = useState(true);
	const [user, setUser] = useState<User | null>(null);

	const signIn = async () => {
		setIsSigningIn(true);

		try {
			const authUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${REACT_NATIVE_CLIENT_ID}`;
			const authSessionResponse = (await startAsync({
				authUrl,
			})) as AuthorizationResponse;

			const { code } = authSessionResponse.params;

			if (
				authSessionResponse.type === "success" &&
				authSessionResponse.params.error !== "access_denied"
			) {
				const { data } = await api.post<AuthResponse>("/authenticate", {
					code,
				});

				const { token, user } = data;

				api.defaults.headers.common.Authorization = `Bearer ${token}`;

				await asyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
				await asyncStorage.setItem(TOKEN_STORAGE, token);

				setUser(user);
			}
		} catch (error) {
			console.log(error);
		}

		setIsSigningIn(false);
	};

	const signOut = () => {
		asyncStorage.multiRemove([USER_STORAGE, TOKEN_STORAGE]);
		setUser(null);
	};

	useEffect(() => {
		const loadUserStorageData = async () => {
			const userStorage = await asyncStorage.getItem(USER_STORAGE);
			const tokenStorage = await asyncStorage.getItem(TOKEN_STORAGE);

			if (userStorage && tokenStorage) {
				api.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;

				setUser(JSON.parse(userStorage));
			}

			setIsSigningIn(false);
		};

		loadUserStorageData();
	}, []);

	return (
		<AuthContext.Provider value={{ isSigningIn, signIn, signOut, user }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);

	return context;
};

export { AuthProvider, useAuth };
