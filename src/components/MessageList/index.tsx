import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Message } from "../Message";
import { api } from "../../services/api";
import { styles } from "./styles";
import { io } from "socket.io-client";

interface MessageProps {
	id: string;
	text: string;
	user: {
		name: string;
		avatarUrl: string;
	};
}

const socket = io(String(api.defaults.baseURL));
const messagesQueue: Array<MessageProps> = [];

socket.on("new-message", (newMessage: MessageProps) => {
	messagesQueue.push(newMessage);
});

export const MessageList = () => {
	const [currentMessages, setCurrentMessages] = useState<Array<MessageProps>>(
		[]
	);

	useEffect(() => {
		const fetchMessages = async () => {
			const { data } = await api.get<Array<MessageProps>>("/messages/last-5");

			setCurrentMessages(data);
		};

		fetchMessages();
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			if (messagesQueue.length > 0) {
				setCurrentMessages((prevState) => [
					messagesQueue[0],
					prevState[0],
					prevState[1],
				]);

				messagesQueue.shift();
			}
		}, 3000);

		return () => clearInterval(timer);
	}, []);

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.content}
			keyboardShouldPersistTaps="never"
		>
			{currentMessages.map((data) => (
				<Message key={data.id} data={data} />
			))}
		</ScrollView>
	);
};
