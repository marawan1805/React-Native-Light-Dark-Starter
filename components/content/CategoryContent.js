import React from "react";
import { ScrollView } from "react-native";
import CardComponent from "../cards/CardComponent";

const CategoryContent = ({ selectedCategory }) => {
  const categoryImages = {
    "Category 1": [
      require("../../images/sample_image_1.jpg"),
      require("../../images/sample_image_2.jpg"),
    ],
    "Category 2": [
      require("../../images/sample_image_3.jpg"),
      require("../../images/sample_image_4.jpg"),
    ],
    "Category 3": [
      require("../../images/sample_image_1.jpg"),
      require("../../images/sample_image_2.jpg"),
    ],
    "Category 4": [
      require("../../images/sample_image_3.jpg"),
      require("../../images/sample_image_4.jpg"),
    ],
    // Add more categories and their respective images arrays
  };

  const images = categoryImages[selectedCategory] || [];

  return (
    <ScrollView
      vertical
      //try horizontal instead of vertical
      showsHorizontalScrollIndicator={false}
    >
      {images.map((imageSource, index) => (
        <CardComponent
          key={index}
          imageSource={imageSource}
          title={`Sample Title - ${selectedCategory}`}
          description={`This is a sample description for the ${selectedCategory} card component.`}
        />
      ))}
    </ScrollView>
  );
};

export default CategoryContent;
