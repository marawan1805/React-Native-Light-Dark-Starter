import React from "react";
import { ScrollView } from "react-native";
import CardComponent from "../cards/CardComponent";

const CategoryContent = ({ selectedCategory }) => {
  const categoryImages = {
    Apparels: [
      require("../../images/apparels/shirt1.jpg"),
      require("../../images/apparels/tshirt.jpeg"),
      require("../../images/apparels/jeans.jpeg"),
    ],
    Foods: [
      require("../../images/food/burger.jpeg"),
      require("../../images/food/chicken.jpeg"),
      require("../../images/food/paneer.jpeg"),
    ],
    Decoration: [
      require("../../images/sample_image_1.jpg"),
      require("../../images/sample_image_2.jpg"),
      require("../../images/sample_image_3.jpg"),
    ],
    Others: [
      require("../../images/sample_image_4.jpg"),
      require("../../images/food/chicken.jpeg"),
      require("../../images/apparels/jeans.jpeg"),
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
          index={index}
          imageSource={imageSource}
          title={`Sample Title - ${selectedCategory}`}
          description={`This is a sample description for the ${selectedCategory} card component.`}
        />
      ))}
    </ScrollView>
  );
};

export default CategoryContent;
