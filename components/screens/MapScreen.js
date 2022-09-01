import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import MapView, {Callout, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { useIsFocused } from "@react-navigation/native";

const Map  = ({ route, navigation }) => {
	
	// Current location of the user
	const [currentLocation, setCurrentLocation] = useState({
		latitude: 0,
		longitude: 0,
	});

	// Sushi store data 
	const [stores , setStores] = useState([]);

	const isFocused = useIsFocused();
    useEffect(() => {
        // Call only when the screen is focused
        if(isFocused){ 
            getLocation();
        }
    }, [isFocused]);

	// Get current location
	const getLocation = () => {
		(async () => {
			if(typeof route.params !== 'undefined'){
				// Set location from params
				setCurrentLocation({
					latitude: Number(route.params.latitude),
					longitude: Number(route.params.longitude)
				});
			} else {
				let { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== 'granted') {
					console.log('Permission to access location was denied');
					return;
				}
			
				let location = await Location.getCurrentPositionAsync({});
				if(typeof location !== 'undefined') {
					// Set current location
					setCurrentLocation({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude
					});
				}
			}})()};

			// Get store data from server
			const getStoreData=()=>{
				fetch('https://stud.hosted.hr.nl/1019785/stores.json'
				,{
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
					setStores(myJson);				});
			}

			useEffect(() => {
				getStoreData();
			  }, []);

	return (
			<View style={styles.container}>
			{/* Mapview */}
			<MapView 
				style={styles.map}
				region={{
					latitude: currentLocation.latitude,
					longitude: currentLocation.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				showsUserLocation={true}
				>
				{/* Markers/Pins */}
				{stores.map((prop, key) => {
					return (
						<Marker  
							key={key}
							coordinate={{latitude: parseFloat(prop.latitude), longitude: parseFloat(prop.longitude)}}
							title= {prop.name}
							description={prop.telephone}
						>
						<Image source={require('../../assets/pin.png')} style={{height: 35, width:35 }} />
						{/* Marker information */}
						<Callout tooltip>
							<View>
								<View style={styles.bubble}>
									<Text style={styles.name}>{prop.name}</Text>
									<Text>Address: {prop.address}</Text>
									<Text>Zip code: {prop.zipcode}</Text>
									<Text>Telephone: {prop.telephone}</Text>			
									<Text>{prop.website ? "Website: " + prop.website : "No website available"}</Text>	
								</View>
								<View style={styles.arrowBorder}/>
								<View style={styles.arrow}/>
							</View>
						</Callout>
					  </Marker>
					);
				})}
				</MapView>
			</View>
	);
};

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	map: {
	  width: Dimensions.get('window').width,
	  height: Dimensions.get('window').height,
	},
	bubble: {
		flexDirection: 'column',
		alignSelf: 'flex-start',
		backgroundColor: '#fff',
		borderRadius: 6,
		borderColor: "#ccc",
		borderWidth: 0.5,
		padding: 15,
		width: 250,
	},
	arrow: {
		backgroundColor: 'transparent',
		borderColor: 'transparent',
		borderTopColor: '#fff',
		borderWidth: 16,
		alignSelf: 'center',
		marginTop: -32,
	},
	arrowBorder: {
		backgroundColor: 'transparent',
		borderColor: 'transparent',
		borderTopColor: '#007a87',
		borderWidth: 16,
		alignSelf: 'center',
		marginTop: -0.5,
	},
	name: {
		fontSize: 20,
		marginBottom: 5, 
		fontWeight: 'bold'
	}
  });

export default Map;
