import React, { useState } from "react";
import { Keyboard, TextInput, View } from "react-native";
import { api } from "../../services/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";
import { styles } from "./styles";

export const SendMessageForm = () => {
	const [message, setMessage] = useState("");
	const [sendingMessage, setSendingMessage] = useState(false);

	const handleMessageSubmit = async () => {
		const messageFormatted = message.trim();

		if (messageFormatted.length > 0) {
			setSendingMessage(true);

			await api.post("/messages", { message: messageFormatted });

			setMessage("");
			Keyboard.dismiss();
			setSendingMessage(false);
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				keyboardAppearance="dark"
				placeholder="Qual sua expectativa para o evento?"
				placeholderTextColor={COLORS.grayPrimary}
				multiline
				maxLength={140}
				onChangeText={setMessage}
				value={message}
				style={styles.input}
				editable={!sendingMessage}
			></TextInput>
			<Button
				title="ENVIAR MENSAGEM"
				backgroundColor={COLORS.pink}
				color={COLORS.white}
				isLoading={sendingMessage}
				onPress={handleMessageSubmit}
			/>
		</View>
	);
};
