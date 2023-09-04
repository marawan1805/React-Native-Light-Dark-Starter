import React, { useRef, useState, useContext } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import CategoryCard from "../cards/CategoryTabCard";
import CategoryContent from "../content/CategoryContent";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

const CategoryTabSection = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const categoriesScrollViewRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("Apparels");

  const handleCategoryPress = (category, index) => {
    setSelectedCategory(category);

    // Scroll the category to the center
    const screenWidth = Dimensions.get("window").width;
    const categoryWidth = 150; // Adjust this value based on your CategoryCard width
    const scrollToX = index * categoryWidth - (screenWidth - categoryWidth) / 2;

    categoriesScrollViewRef.current.scrollTo({
      x: scrollToX,
      animated: true,
    });
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={categoriesScrollViewRef}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {["Apparels", "Foods", "Decoration", "Others"].map(
          (category, index) => (
            <CategoryCard
              key={index}
              index={index + 1}
              title={category}
              onPress={() => handleCategoryPress(category, index)}
              isActive={category === selectedCategory}
            />
          )
        )}
      </ScrollView>

      <CategoryContent selectedCategory={selectedCategory} />
    </View>
  );
};

export default CategoryTabSection;
