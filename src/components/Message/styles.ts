import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../theme";

export const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginBottom: 36,
	},
	message: {
		color: COLORS.white,
		fontSize: 15,
		fontFamily: FONTS.regular,
		lineHeight: 20,
		marginBottom: 12,
	},
	footer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
	},
	userName: {
		color: COLORS.white,
		fontSize: 15,
		fontFamily: FONTS.regular,
		marginLeft: 16,
	},
});
