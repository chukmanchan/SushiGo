import * as React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Menu from "../menu";
import hotspots from "../hotspots.json";

function MapScreen() {
  const [isActive, setIsActive] = React.useState(false);

  const [currentLocation, setCurrentLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  React.useEffect(() => {
    async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        console.log(location);
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    };
  });
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        Region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
      </MapView>
      {isActive ? (
        <Callout>
          <Menu></Menu>
        </Callout>
      ) : null}
      <Callout>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            setIsActive(!isActive);
          }}
        >
          {isActive ? (
            <Ionicons name={"close"} size={24} color={"#3D3D3D"}></Ionicons>
          ) : (
            <Ionicons name={"list"} size={24} color={"#3D3D3D"}></Ionicons>
          )}
        </TouchableOpacity>
      </Callout>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  menuButton: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    margin: 10,
  },
});

export default MapScreen;