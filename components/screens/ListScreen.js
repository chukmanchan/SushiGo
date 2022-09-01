import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Button, ScrollView } from 'react-native'
import themeContext from '../../config/themeContext';

// Import the components
import TopPart from "../TopPart";
import BottomPart from "../BottomPart";

const List  = ({ navigation }) => {

	// Load the theme
	const theme = useContext(themeContext);

	// Sushi store data
	const [stores , setStores] = useState([]);

	// Get data from webapi 
	const getStoreData=()=>{
		fetch('https://stud.hosted.hr.nl/1019785/stores.json',
		{
		  headers:{ 
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		   }
		}
		)
		.then(function(response){
			return response.json();
		})
		.then(function(myJson) {
			setStores(myJson);
		});
	}

	  useEffect(() => {
		getStoreData();
	  }, []);

	return (
      	<ScrollView>
				<View style={[ styles.container, {backgroundColor: theme.background }]}>
					{stores.map((prop, key) => {
						return (
							<View key={key} style={[ styles.card, { borderColor: theme.borderColor, backgroundColor: theme.listBackground }]}>
								{/* Sushi store information */}
								<TopPart
									name = {prop.name}
									address = {prop.address}
									zipcode = {prop.zipcode}
									telephone = {prop.telephone}
									website = {prop.website}
								/>
								{/* Go to the spot on the map */}
								<Button
									style={styles.buttonStyle}
									color="#db4237"
									title="Look it up on the map"
									onPress={() => {
										navigation.navigate('Map', {
										latitude: prop.latitude,
										longitude: prop.longitude,
										});
									}}
								/>
								{/* Link to the share button */}
								<BottomPart
									name = {prop.name}
								/>
							</View>
						);
					})} 
				</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center',
		marginBottom: 20
	  },
	  card: {
		  borderRadius: 6,
		  borderWidth: 0.5,
		  padding: 15,
		  width: '99%',
		  marginTop: 15 
	  },
  });

export default List;
