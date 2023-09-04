import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

const CategoryCard = ({ title, onPress, isActive, index }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image
        style={styles.image}
        source={require("../../images/sample_image_1.jpg")}
      />
      <View
        style={[
          styles.container,
          {
            backgroundColor: isActive
              ? colors.light.red
              : colors.light.secondary,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: isActive ? colors.light.primary : colors.light.text },
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: "center",
  },
  activeContainer: {
    backgroundColor: "#FFA500",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeTitle: {
    color: "#FFFFFF",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: -20,
    marginTop: 15,
  },
});

export default CategoryCard;
