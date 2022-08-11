import * as React from "react";
import { Callout, Marker } from "react-native-maps";
import { StyleSheet, View, Text, Linking, Appearance, useColorScheme
} from "react-native";

function Pins() {
  // State variable sights
  const [hotspots, setHotspots] = React.useState([]);

  const colorTheme = useColorScheme();
  const themeTextStyle = colorTheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorTheme === "light" ? styles.lightContainer : styles.darkContainer;

  // Fetch the data from the api
  const getHotspots = () => {
    fetch("https://stud.hosted.hr.nl/1019785/hotspots.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHotspots(data);
      });
  };

  React.useEffect(() => {
    getHotspots();
  }, []);

  return hotspots.map((prop, key) => {
    return (
      <Marker
        key={key}
        coordinate={{
          latitude: parseFloat(prop.latitude),
          longitude: parseFloat(prop.longitude),
        }}
        title={prop.naam}
      >
        <Callout tooltip>
          <View style={[styles.popup, themeContainerStyle]}>
            <Text style={[{ fontWeight: "bold" }, themeTextStyle]}>
              {prop.name}
            </Text>
            <Text style={themeTextStyle}>Adres: {prop.adres}</Text>
            <Text style={themeTextStyle}>Postcode: {prop.postcode}</Text>
            {prop.telefoon ? (
              <Text style={themeTextStyle}>Tel: {prop.telefoon}</Text>
            ) : null}
            {prop.website ? (
              <Text
                style={themeTextStyle}
                onPress={() => Linking.openURL(prop.website)}
              >
                Website:{" "}
                <Text style={{ color: "lightblue" }}>{prop.website}</Text>
              </Text>
            ) : null}
          </View>
        </Callout>
      </Marker>
    );
  });
}

const styles = StyleSheet.create({
  popup: {
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
  },
  lightContainer: {
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#3D3D3D",
  },
  lightThemeText: {
    color: "#3D3D3D",
  },
  darkThemeText: {
    color: "#fff",
  },
});

export default Pins;
