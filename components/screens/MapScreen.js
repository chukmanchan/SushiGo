import * as React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, TouchableOpacity, Appearance, useColorScheme } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Pins from "../Pins";

function MapScreen() {
  const [isActive, setIsActive] = React.useState(false);

  const [currentLocation, setCurrentLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  const colorTheme = useColorScheme()
  const themeContainerStyle =
    colorTheme === "light" ? styles.lightContainer : styles.darkContainer;

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
        followsUserLocation={true}
      >
        {isActive ? <Pins></Pins> : null}
      </MapView>
      <Callout>
        <TouchableOpacity
          style={[styles.menuButton, themeContainerStyle]}
          onPress={() => {
            setIsActive(!isActive);
          }}
        >
          {isActive ? (
            colorTheme === "light" ? (
              <Ionicons
                name={"close"}
                size={24}
                color={"#3D3D3D"}
              ></Ionicons>
            ) : (
              <Ionicons name={"close"} size={24} color={"#fff"}></Ionicons>
            )
          ) : colorTheme === "light" ? (
            <Ionicons name={"list"} size={24} color={"#3D3D3D"}></Ionicons>
          ) : (
            <Ionicons name={"list"} size={24} color={"#fff"}></Ionicons>
          )}
        </TouchableOpacity>
      </Callout>
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
    padding: 5,
    borderRadius: 10,
    margin: 10,
  },
  lightContainer: {
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#3D3D3D",
  },
});

export default MapScreen;