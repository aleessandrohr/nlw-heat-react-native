import React, { ComponentProps } from "react";
import {
	TouchableOpacity,
	TouchableOpacityProps,
	Text,
	ColorValue,
	ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";

interface Props extends TouchableOpacityProps {
	title: string;
	backgroundColor: ColorValue;
	color: ColorValue;
	icon?: ComponentProps<typeof AntDesign>["name"];
	isLoading?: boolean;
}

export const Button = ({
	backgroundColor,
	color,
	title,
	icon,
	isLoading = false,
	...props
}: Props) => (
	<TouchableOpacity
		style={[styles.button, { backgroundColor }]}
		activeOpacity={0.7}
		disabled={isLoading}
		{...props}
	>
		{isLoading ? (
			<ActivityIndicator color={color} />
		) : (
			<>
				<AntDesign name={icon} size={24} style={styles.icon} />
				<Text style={[styles.title, { color }]}>{title}</Text>
			</>
		)}
	</TouchableOpacity>
);
