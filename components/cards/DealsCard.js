import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const CardComponent = ({ imageSource, title, description }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.light.secondary }]}
      onPress={() => navigation.navigate("Shop", { title: "Todays Deals" })}
    >
      <Image style={styles.image} source={imageSource} />
      <View style={styles.contentContainer}>
        <Text
          style={[styles.title, { color: colors.light.text }]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={[styles.description, { color: colors.light.tertiary }]}
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
    width: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    flexDirection: "column",
    margin: 10,
  },
  image: {
    width: 200,
    height: 100,
    borderRadius: 0,
  },
  contentContainer: {
    padding: 10,
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#777",
    flexWrap: "wrap", // Add this line to wrap the text
    overflow: "hidden", // Add this line to hide overflowing text
    lineHeight: 18, // Add this line to improve line spacing
    maxHeight: 36, // Add this line to limit the number of lines to 2
  },
});

export default CardComponent;
