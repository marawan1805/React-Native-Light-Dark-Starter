import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import DealsCard from "../cards/DealsCard";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

const images = [
  require("../../images/sample_image_1.jpg"),
  require("../../images/sample_image_2.jpg"),
  require("../../images/sample_image_3.jpg"),
  require("../../images/sample_image_4.jpg"),
  require("../../images/sample_image_2.jpg"),
  require("../../images/sample_image_3.jpg"),
  require("../../images/sample_image_4.jpg"),
];

const HorizontalDealsSection = ({ selectedCategory }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          paddingHorizontal: 10,
          marginTop: 20,
          marginBottom: 15,
          color: activeColors.text,
        }}
      >
        Today's Deals
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((imageSource, index) => (
          <DealsCard
            key={index}
            imageSource={imageSource}
            title={`Sample Title - ${index}`}
            description={`This is a sample description for the ${index} card component.`}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default HorizontalDealsSection;
