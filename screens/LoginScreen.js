import { View, Text, StyleSheet, Image, Button } from "react-native";
import React from "react";

const circle_logo = "../assets/circle-icon.png";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.Container}>
      <View style={styles.LogoContainer}>
        <Image source={{ uri: circle_logo }} />
        <Button
          style={styles.Button}
          title="Login"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  LogoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default LoginScreen;
