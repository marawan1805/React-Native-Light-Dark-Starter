import { FlatList } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../config/theme";
import RewardsItem from "./RewardsItem";

const RewardsContainer = (props) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  const scrollViewRef = useRef();

  return (
    <FlatList
      style={{
        backgroundColor: "#F7E0AE",
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
      ref={scrollViewRef}
      contentContainerStyle={{
        paddingLeft: 25,
        paddingTop: 25,
        paddingBottom: 25,
      }}
      //i+1th item is the initial item
      // initialScrollIndex={"3"}
      onContentSizeChange={() =>
        scrollViewRef.current.scrollToIndex({ index: "2", animated: true })
      }
    />
  );
};

export default RewardsContainer;
