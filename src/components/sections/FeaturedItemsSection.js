import React, { useContext } from "react";
import { View, Text } from "react-native";
import FeaturedCardComponent from "../cards/FeaturedCardComponent";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

const images = [
  require("../../images/sample_image_1.jpg"),
  require("../../images/sample_image_2.jpg"),
  require("../../images/sample_image_3.jpg"),
  require("../../images/sample_image_4.jpg"),
];

const FeaturedItemsSection = () => {
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
        Featured Items
      </Text>
      <View style={{ flexDirection: "column", paddingHorizontal: 10 }}>
        {[...Array(2)].map((_, rowIndex) => (
          <View
            key={rowIndex}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {[...Array(2)].map((_, colIndex) => (
              <FeaturedCardComponent
                key={colIndex}
                imageSource={images[rowIndex * 2 + colIndex]}
                title={`Featured Item ${rowIndex * 2 + colIndex + 1}`}
                description="This is a sample description for the featured item."
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default FeaturedItemsSection;
