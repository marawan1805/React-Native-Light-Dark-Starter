import React, { useState } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../config/theme";
import { auth, db } from "../config/firebase";

import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

const RegisterScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const pressRegister = () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, "users", email), {
          uid: user.uid,
          email,
          password,
        })
          .then(() => {
            ToastAndroid.show("Account created.", ToastAndroid.LONG);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == "auth/email-already-in-use") {
          ToastAndroid.show(
            "User already exist, Kindly login kutte.",
            ToastAndroid.LONG
          );
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
              width: 200,
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
          Create an account
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
        />

        <CustomButton
          label={
            isLoading ? (
              <ActivityIndicator size="small" color={colors.light.primary} />
            ) : (
              "Register"
            )
          }
          onPress={() => pressRegister()}
        />

        <Text
          style={{
            textAlign: "center",
            color: colors.light.tint,
            marginBottom: 30,
          }}
        >
          Or, register with...
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
          <Text style={{ color: colors.light.tint }}>Already registered? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: colors.light.accent, fontWeight: "700" }}>
              {" "}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
