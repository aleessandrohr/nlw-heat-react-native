import React from "react";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import avatarDefault from "../../assets/avatar.png";
import { styles } from "./styles";
import { COLORS } from "../../theme";

const SIZES = {
	small: {
		containerSize: 32,
		avatarSize: 28,
	},
	normal: {
		containerSize: 48,
		avatarSize: 42,
	},
};

interface Props {
	imageUri?: string;
	size?: "small" | "normal";
}

const AvatarDefault = Image.resolveAssetSource(avatarDefault).uri;

export const UserPhoto = ({
	imageUri = AvatarDefault,
	size = "normal",
}: Props) => {
	const { avatarSize, containerSize } = SIZES[size];

	return (
		<LinearGradient
			colors={[COLORS.pink, COLORS.yellow]}
			start={{ x: 0, y: 0.8 }}
			end={{ x: 0.9, y: 1 }}
			style={[
				styles.container,
				{
					width: containerSize,
					height: containerSize,
					borderRadius: containerSize / 2,
				},
			]}
		>
			<Image
				source={{ uri: imageUri }}
				style={[
					styles.avatar,
					{
						width: avatarSize,
						height: avatarSize,
						borderRadius: avatarSize / 2,
					},
				]}
			/>
		</LinearGradient>
	);
};
