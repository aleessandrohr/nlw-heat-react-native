import React from "react";
import { View } from "react-native";
import { useAuth } from "../../contexts/auth";
import { COLORS } from "../../theme";
import { Button } from "../Button";
import { styles } from "./styles";

export const SignInBox = () => {
	const { signIn, isSigningIn } = useAuth();

	return (
		<View style={styles.container}>
			<Button
				title="ENTRAR COM O GITHUB"
				color={COLORS.blackPrimary}
				backgroundColor={COLORS.yellow}
				icon="github"
				onPress={signIn}
				isLoading={isSigningIn}
			/>
		</View>
	);
};
