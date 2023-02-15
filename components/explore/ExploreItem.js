import { StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { colors } from "../../config/theme";
import StyledText from "../Texts/StyledText";

const ExploreItem = ({ image, title, ...props }) => {
  return (
    <TouchableOpacity
      onPress={() => alert(title)}
      style={[styles.Container]}
      {...props}
    >
      <Image source={image} style={[styles.image, StyleSheet.absoluteFill]} />

      <StyledText style={styles.title} bold></StyledText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    height: 120,
    width: 120,
    borderRadius: 90,
    marginRight: 20,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },

  title: {
    fontSize: 19,
    color: colors.primary,
    height: "100%",
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.accent,
  },
});

export default ExploreItem;
