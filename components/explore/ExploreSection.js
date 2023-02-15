import { FlatList } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../config/theme";
import ExploreItem from "./ExploreItem";

const ExploreSection = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => <ExploreItem {...item} />}
      // keyExtractor={({ id }) => id.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingLeft: 25,
        paddingTop: 25,
      }}
    />
  );
};

export default ExploreSection;
