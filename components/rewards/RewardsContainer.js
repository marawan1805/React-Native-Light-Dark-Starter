import { FlatList } from "react-native";
import React, { useContext, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../config/theme";
import RewardsItem from "./RewardsItem";

const RewardsContainer = (props) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <FlatList
      style={{
        backgroundColor: activeColors.accent,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 25,
      }}
      showsVerticalScrollIndicator={false}
      data={props.data}
      renderItem={({ item }) => <RewardsItem myRef={props.myRef} {...item} />}
      // keyExtractor={({ id }) => id.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingLeft: 25,
        paddingTop: 25,
        paddingBottom: 25,
      }}
    />
  );
};

export default RewardsContainer;
