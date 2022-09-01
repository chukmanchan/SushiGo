import React, { useState, useEffect } from "react";
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from './config/themeContext';
import theme from './config/theme';

// Imports Screens and Components
import HomeScreen from "./components/screens/HomeScreen";
import MapScreen from "./components/screens/MapScreen";
import ListScreen from "./components/screens/ListScreen";
import ReviewsScreen from "./components/screens/ReviewsScreen";
import DarkModeSwitch from "./components/DarkModeSwitch";

const Tab = createBottomTabNavigator();

export default function App() {

  // Theme mode
  const [mode, setMode] = useState(false);

  // Change the theme 
  useEffect(() => {
    let eventListener = EventRegister.addEventListener("changeTheme", (data) => {
      setMode(data);
    });
    return () => {
      EventRegister.removeEventListener(eventListener);
    }
  })

  return (
    <themeContext.Provider value={mode === true ? theme.dark : theme.light} >
      <NavigationContainer theme = {mode === true ? DarkTheme : DefaultTheme}>
        {/* Navigation bar with all the screens */}
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerRight: () => (
                <DarkModeSwitch/>
              ),
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Map"
            component={MapScreen}
            options={{
              headerRight: () => (
                <DarkModeSwitch/>
              ),
              tabBarLabel: 'Map',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="map" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Sushi Spots"
            component={ListScreen}
            options={{
              headerRight: () => (
                <DarkModeSwitch/>
              ),
              tabBarLabel: 'Sushi Spots',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Reviews"
            component={ReviewsScreen}
            options={{
              headerRight: () => (
                <DarkModeSwitch/>
              ),
              tabBarLabel: 'Reviews',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="star" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
}