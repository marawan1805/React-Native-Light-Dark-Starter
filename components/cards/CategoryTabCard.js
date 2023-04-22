import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

const CategoryCard = ({ title, onPress, isActive }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: isActive
              ? activeColors.category
              : activeColors.secondary,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: isActive ? activeColors.primary : activeColors.text },
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
});

export default CategoryCard;
