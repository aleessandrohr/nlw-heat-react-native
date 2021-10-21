import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.blackSecondary,
		paddingTop: getStatusBarHeight() + 17,
	},
});
