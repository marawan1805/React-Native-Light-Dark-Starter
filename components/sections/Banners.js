import React, { useRef, useEffect, useContext, useState } from "react";
import { View, ScrollView, Image, Dimensions } from "react-native";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

const images = [
  require("../../images/banners/banner1.jpg"),
  require("../../images/banners/banner3.jpg"),
  require("../../images/banners/banner2.jpeg"),
  require("../../images/banners/banner4.png"),
];

const Banners = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const screenWidth = Dimensions.get("window").width;

  const scrollViewRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollInterval = useRef(null);
  const scrollSpeed = 0;
  const contentWidth = 1570;

  useEffect(() => {
    scrollInterval.current = setInterval(() => {
      const nextScrollPosition = scrollPosition + 1;

      if (nextScrollPosition >= contentWidth) {
        setScrollPosition(0);
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
      } else {
        setScrollPosition(nextScrollPosition);
        scrollViewRef.current.scrollTo({
          x: nextScrollPosition,
          y: 0,
          animated: false,
        });
      }
    }, scrollSpeed);

    return () => {
      clearInterval(scrollInterval.current);
    };
  }, [scrollPosition]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ width: contentWidth }}
    >
      {images.map((imageSource, index) => (
        <Image
          key={index}
          style={{
            width: screenWidth,
            height: 200,
          }}
          source={imageSource}
        />
      ))}
    </ScrollView>
  );
};

export default Banners;
