import React from "react";
import { View, Text } from "react-native";
import { MotiView } from "moti";
import { UserPhoto } from "../UserPhoto";
import { styles } from "./styles";

interface MessageProps {
	id: string;
	text: string;
	user: {
		name: string;
		avatarUrl: string;
	};
}

interface Props {
	data: MessageProps;
}

export const Message = ({ data }: Props) => {
	return (
		<MotiView
			from={{ opacity: 0, translateY: -50 }}
			animate={{ opacity: 1, translateY: 0 }}
			transition={{ type: "timing", duration: 700 }}
			style={styles.container}
		>
			<Text style={styles.message}>{data.text}</Text>
			<View style={styles.footer}>
				<UserPhoto imageUri={data.user.avatarUrl} size="small" />
				<Text style={styles.userName}>{data.user.name}</Text>
			</View>
		</MotiView>
	);
};
