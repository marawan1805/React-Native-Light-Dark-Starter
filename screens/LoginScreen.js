import React, { useContext, useState } from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

const LoginScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const pressLogin = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        ToastAndroid.show("Logged in.", ToastAndroid.LONG);
        setIsLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == "auth/user-not-found") {
          ToastAndroid.show("Email does not exist.", ToastAndroid.LONG);
          setIsLoading(false);
        } else if (errorCode == "auth/wrong-password") {
          ToastAndroid.show("Password was wrong.", ToastAndroid.LONG);
          setIsLoading(false);
        } else if (errorCode == "auth/invalid-email") {
          ToastAndroid.show("Invailid Email.", ToastAndroid.LONG);
          setIsLoading(false);
        } else if (errorCode == "auth/missing-email") {
          ToastAndroid.show("Email can't be blank.", ToastAndroid.LONG);
          setIsLoading(false);
        } else if (errorCode == "auth/weak-password") {
          ToastAndroid.show(
            "Password must be atleast 6 digits.",
            ToastAndroid.LONG
          );
          setIsLoading(false);
        } else if (errorCode == "auth/missing-password") {
          ToastAndroid.show("Password can't be blank.", ToastAndroid.LONG);
          setIsLoading(false);
        } else {
          ToastAndroid.show(errorCode, ToastAndroid.BOTTOM);
          setIsLoading(false);
        }
      });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.light.primary,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../images/login.png")}
            style={{
              height: 200,
              width: 300,
              transform: [{ rotate: "-5deg" }],
            }}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: colors.light.tint,
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Login
        </Text>

        <InputField
          selectionColor={colors.light.tint}
          label={"Email ID"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          onChangeText={setEmail}
          value={email.toLowerCase()}
          keyboardType="email-address"
        />

        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          onChangeText={setPassword}
          value={password}
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => navigation.navigate("Register")}
        />

        <CustomButton
          label={
            isLoading ? (
              <ActivityIndicator size="small" color={colors.light.primary} />
            ) : (
              "Login"
            )
          }
          onPress={() => pressLogin()}
        />
        <Text
          style={{
            textAlign: "center",
            color: colors.light.tint,
            marginBottom: 30,
          }}
        >
          Or, login with...
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: colors.light.secondary,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image
              source={require("../images/google.png")}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: colors.light.secondary,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image
              source={require("../images/facebook.png")}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: colors.light.secondary,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image
              source={require("../images/apple.png")}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text style={{ color: colors.light.tint }}>New to the app? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: colors.light.accent, fontWeight: "700" }}>
              {" "}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
