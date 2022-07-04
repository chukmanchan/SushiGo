import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import hotspots from "./hotspots.json";

function Menu() {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 25 }}>
        <View style={{ margin: 10 }}>
          {hotspots.map((prop) => {
            return <Text>{prop.name}</Text>;
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
  },
});

export default Menu;