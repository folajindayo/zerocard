import '../global.css';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
			}}
		/>
	);
}
