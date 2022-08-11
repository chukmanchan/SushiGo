import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Appearance, useColorScheme } from "react-native";

function SettingScreen() {

  const colorTheme = useColorScheme();
  const themeTextStyle = colorTheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorTheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeButtonStyle = colorTheme === "light" ? styles.lightButton : styles.darkButton;

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={[{ fontSize: 36 }, themeTextStyle]}>
        Adjust Settings

      </Text>
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

export default SettingScreen;