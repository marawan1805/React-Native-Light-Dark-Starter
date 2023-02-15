import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useContext } from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import StyledText from "../components/Texts/StyledText";
import NewsContainer from "../components/news/NewsContainer";
import { newsData } from "../config/data";
import ExploreSection from "../components/explore/ExploreSection";

const News = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  return (
    <ScrollView
      style={[{ backgroundColor: activeColors.primary }, styles.Container]}
    >
      <StyledText style={styles.sectionTitle} big>
        Trending News
      </StyledText>
      <NewsContainer data={newsData} />
      <StyledText style={styles.sectionTitle} big>
        Explore
      </StyledText>
      <ExploreSection data={newsData} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  sectionTitle: {
    marginTop: 25,
    marginLeft: 25,
  },
});

export default News;
