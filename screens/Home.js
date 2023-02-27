import React, { useContext } from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import StyledText from "../components/texts/StyledText";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <ScrollView
      style={[
        {
          backgroundColor: activeColors.primary,
        },
        styles.Container,
      ]}
    >
      <StyledText style={styles.sectionTitle} big>
        Home
      </StyledText>
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
    marginBottom: 25,
  },
});

export default Home;
