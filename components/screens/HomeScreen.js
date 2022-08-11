import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Appearance, useColorScheme, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function HomeScreen({ navigation }) {

  const colorTheme = useColorScheme()

  if (colorTheme === 'dark') {
    
  } else {
    
  }
  const themeTextStyle = colorTheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorTheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeButtonStyle = colorTheme === "light" ? styles.lightButton : styles.darkButton;
// {colorTheme}
  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={[styles.text, themeTextStyle]}>
        <Text>SushiGo</Text>
      </Text>
      <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/174/174295.png'}}
       style={{width: 300, height: 300}} />
        
      <TouchableOpacity
        style={[styles.button, themeButtonStyle]}
        onPress={() => navigation.navigate("Maps")}
      >
        {colorTheme === "light" ? (
          <Ionicons name="walk-outline" size={36} color="#3D3D3D" />
        ) : (
          <Ionicons name="walk-outline" size={36} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 36,
    width: 300,
    textAlign: "center",
  },
  button: {
    padding: 10,
    borderRadius: 36,
    margin: 20,
    borderWidth: 2,
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
  lightButton: {
    borderColor: "#3D3D3D",
  },
  darkButton: {
    borderColor: "#fff",
  },
});

export default HomeScreen;