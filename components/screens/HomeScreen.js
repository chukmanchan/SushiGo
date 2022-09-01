import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import themeContext from '../../config/themeContext';

const Home = ({ navigation }) => {

	// Loading theme
	const theme = useContext(themeContext);

	return (
		<View style={[ styles.container, {backgroundColor: theme.background }]}>
			{/* Logo */}
			<View style={styles.imageContainer}>
				<Image
					style={styles.logo}
					source={require('../../assets/icon.png')}
				/>
			</View>
			<View style={styles.contentHolder}>
				{/* All text */}
				<Text style={[styles.title,{ color: theme.color}]}>SushiGo</Text>
				<Text style={[styles.text,{ color: theme.color}]}>Are you a tourist currently in Rotterdam and you want some sushi?</Text>
				<Text style={[styles.text,{ color: theme.color}]}>This is the app dedicated to you, here you can find all Sushi places in Rotterdam</Text>
				
				{/* Button to map screen */}
				<Button
					title="Start looking"
					color="#db4237"
					onPress={() => {
						navigation.navigate('Map');
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainer: {
		marginTop: 75,
	},
	logo: {
		width: 150,
		height: 150,
	},
	contentHolder: {
		width: "90%"
	},
	title: {
		textAlign: "center",
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 20
	},
	text: {
		textAlign: "center",
		marginBottom: 20
	}
});

export default Home;
