import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../theme";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 20,
	},
	logoutButton: {
		flexDirection: "row",
		alignItems: "center",
	},
	logoutText: {
		fontSize: 15,
		fontFamily: FONTS.regular,
		color: COLORS.white,
		marginRight: 20,
	},
});
