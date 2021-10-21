import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Logo from "../../assets/logo.svg";
import { useAuth } from "../../contexts/auth";
import { UserPhoto } from "../UserPhoto";
import { styles } from "./styles";

export const Header = () => {
	const { user, signOut } = useAuth();

	return (
		<View style={styles.container}>
			<Logo />
			<View style={styles.logoutButton}>
				{user && (
					<TouchableOpacity onPress={signOut}>
						<Text style={styles.logoutText}>Sair</Text>
					</TouchableOpacity>
				)}
				<UserPhoto imageUri={user?.avatarUrl} />
			</View>
		</View>
	);
};
