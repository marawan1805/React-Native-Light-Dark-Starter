import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Text,
} from "react-native";
import { Alert, Modal, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../config/theme";
import StyledText from "../Texts/StyledText";

const RewardsItem = (props) => {
  const handlePress = () => {
    props.myRef.current?.play();
    setModalVisible(true);
  };
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  const [modalVisible, setModalVisible] = useState(false);

  //test status for locking button
  const [status, setStatus] = useState(false);

  return (
    <View
      style={[{ backgroundColor: activeColors.secondary }, styles.Container]}
      {...props}
    >
      <StyledText
        numberOfLines={1}
        style={[{ color: activeColors.accent }, styles.title]}
        bold
      >
        {props.title}
      </StyledText>
      <Image source={props.image} style={styles.image} />

      {/* //TODO: CHECK FOR SECURITY (USER CAN ADD ONPRESS FOR LOCKED BUTTON) */}
      {!status && (
        <TouchableOpacity
          title="Claim"
          style={{
            backgroundColor: "#AD40AF",
            padding: 8,
            width: 85,
            borderRadius: 10,

            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: 16,
              color: "#fff",
            }}
          >
            Claim
          </Text>
        </TouchableOpacity>
      )}
      {status && (
        <TouchableOpacity
          title="Claim"
          onPress={handlePress}
          style={{
            backgroundColor: "#AD40AF",
            padding: 8,
            width: 85,
            borderRadius: 10,

            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: 16,
              color: "#fff",
            }}
          >
            Claim
          </Text>
        </TouchableOpacity>
      )}
      {/* modal */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      {!status && (
        <View style={styles.overlay}>
          <Image
            source={require("../../assets/lock.png")}
            style={{
              width: 100,
              height: 100,
              justifyContent: "center",
              alignSelf: "center",
              marginTop: 15,
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    height: 150,
    width: 150,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#AD40AF",
    borderWidth: 4,
  },
  image: {
    width: 70,
    height: 70,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  title: {
    fontSize: 19,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default RewardsItem;
