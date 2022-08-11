import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Appearance, useColorScheme, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Available Screens
import HomeScreen from "./components/screens/HomeScreen";
import MapScreen from "./components/screens/MapScreen";
import SettingScreen from "./components/screens/SettingScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const colorTheme = useColorScheme()
  const themeTextStyle = colorTheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorTheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeTintColor = colorTheme === "light" ? "#3D3D3D" : "#fff";

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Switch icons
            if (route.name === "Home") {
              iconName = focused ? "md-home" : "md-home-outline";
            } else if (route.name === "Maps") {
              iconName = focused ? "md-map" : "md-map-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "md-settings" : "md-settings-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#ff0000",
          tabBarInactiveTintColor: themeTintColor,
          headerStyle: themeContainerStyle,
          tabBarStyle: themeContainerStyle,
          headerTitleStyle: themeTextStyle,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Maps" component={MapScreen} />
        <Tab.Screen name="Settings" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
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
  lightThemeText: {
    color: "#3D3D3D",
  },
  darkThemeText: {
    color: "#fff",
  },
});