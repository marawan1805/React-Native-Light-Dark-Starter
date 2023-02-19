import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useContext, useRef } from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import StyledText from "../components/Texts/StyledText";

import { rewardsData } from "../config/data";
import ExploreSection from "../components/explore/ExploreSection";
import Lottie from "lottie-react-native";
import RewardsContainer from "../components/rewards/RewardsContainer";

const Rewards = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const LottieRef = useRef(false);

  return (
    <ScrollView
      style={[
        {
          backgroundColor: activeColors.primary,
        },
        styles.Container,
      ]}
    >
      <Lottie
        // resizeMode="cover"
        source={require("../assets/animations/success.json")}
        ref={LottieRef}
        autoPlay={false}
        loop={false}
        speed={1.5}
      />
      <StyledText style={styles.sectionTitle} big>
        Rewards
      </StyledText>
      <RewardsContainer myRef={LottieRef} data={rewardsData} />
      <StyledText style={styles.sectionTitle} big>
        Explore
      </StyledText>
      <ExploreSection data={rewardsData} />
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

export default Rewards;
