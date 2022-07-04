import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 36,
          width: 300,
          textAlign: "center",
          color: "#3D3D3D",
        }}
      >
        <Text style={{ color: "#FF0040" }}>SushiGo</Text>
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Maps")}
      >
        <Ionicons name="walk-outline" size={36} color="#3D3D3D" />
      </TouchableOpacity>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    borderRadius: 36,
    margin: 20,
    borderWidth: 2,
    borderColor: "#3D3D3D",
  },
});

export default HomeScreen;