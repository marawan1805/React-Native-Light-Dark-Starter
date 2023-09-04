import React from "react";
import { View, StyleSheet } from "react-native";

const FixedButton = ({ children }) => {
  return (
    <View>
      {children && React.cloneElement(children, { styles: styles.btn })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
  btn: {
    height: "auto",
    justifyContent: "center",
  },
});

export default FixedButton;
