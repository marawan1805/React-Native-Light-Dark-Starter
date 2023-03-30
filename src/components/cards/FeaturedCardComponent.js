import React, { useContext } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

const FeaturedCardComponent = ({ imageSource, title, description }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    // Add the background color
    <TouchableOpacity
      style={[styles.container, { backgroundColor: activeColors.secondary }]}
    >
      <Image style={styles.image} source={imageSource} />
      <View style={styles.textContainer}>
        <Text
          style={[styles.title, { color: activeColors.text }]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={[styles.description, { color: activeColors.tertiary }]}
          numberOfLines={2}
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    padding: 10,
    width: "48%", // Adjust this value if necessary
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#7a7a7a",
  },
});

export default FeaturedCardComponent;
