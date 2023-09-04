import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  query,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { auth, db } from "../config/firebase";
import { colors } from "../config/theme";
import { onAuthStateChanged } from "firebase/auth";

const screenHeight = Dimensions.get("screen").height;

const Basket = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);
  const [products, setProducts] = useState([]);
  const [documentCount, setDocumentCount] = useState(0);
  const [isAddress, setIsAddress] = useState(false);

  const getBasket = async (email) => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        console.log("User is signed out.");
      }
    });

    const q = query(collection(db, "users", email, "basket"));
    onSnapshot(q, async (querySnapshot) => {
      const countedDocs = querySnapshot.size;
      const basketData = querySnapshot.docs.map((doc) => doc.data());
      if (basketData) {
        setBasket(basketData);
        setDocumentCount(countedDocs);
        const productItems = [];
        await Promise.all(
          basket.map(async (item) => {
            const url = "https://dummyjson.com/products/" + item.productId;
            try {
              const response = await fetch(url);
              const result = await response.json();
              productItems.push(result);
            } catch (error) {
              ToastAndroid.show(error, ToastAndroid.SHORT);
            }
          })
        );
        setProducts(productItems);
        setIsLoading(false);
      }
    });
  };

  const deleteProduct = async (pId) => {
    const subCollRef = collection(db, "users/" + user.email + "/basket/");
    await deleteDoc(doc(subCollRef, "product" + pId))
      .then(() => {
        ToastAndroid.show("Removed from basket.", ToastAndroid.BOTTOM);
        getBasket(user.email);
      })
      .catch((err) => {
        ToastAndroid.show("Something went wrong.", ToastAndroid.BOTTOM);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        getBasket(authUser.email);
      } else {
        console.log("User is signed out.");
      }
    });
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={colors.light.pink}
        style={[
          styles.loadingIndicator,
          { backgroundColor: colors.light.primary },
        ]}
      />
    );
  }

  return (
    <>
      <ScrollView>
        <View
          style={{
            backgroundColor: colors.light.secondary,
            marginBottom: 50,
          }}
        >
          <View
            style={{
              width: "100%",
              paddingVertical: 5,
              paddingHorizontal: 15,
              marginVertical: 5,
              backgroundColor: colors.light.primary,
            }}
          >
            {isAddress == true ? (
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    marginBottom: 10,
                  }}
                >
                  Ashish Kumar
                </Text>
                <Text style={{ color: colors.light.gray }}>
                  Hanuman Mandir, Koyari Tola, Piri
                </Text>
                <Text style={{ color: colors.light.gray }}>Piri Barkakana</Text>
                <Text style={{ color: colors.light.gray }}>
                  Ramgarh, Jharkhand 829102
                </Text>
                <Text style={{ color: colors.light.gray, marginTop: 10 }}>
                  Mobile:{" "}
                  <Text style={{ color: colors.light.text, fontWeight: "600" }}>
                    8340257758
                  </Text>
                </Text>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 40,
                    borderColor: colors.light.gray,
                    borderWidth: 0.5,
                    borderRadius: 2,
                    marginVertical: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>Edit Address</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={{ alignSelf: "center" }}>No addresses found</Text>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 40,
                    borderColor: colors.light.gray,
                    borderWidth: 0.5,
                    borderRadius: 2,
                    marginVertical: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>Add Address</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {products.map((item, id) => (
            <View
              key={id}
              style={{
                width: "100%",
                height: 200,
                paddingVertical: 5,
                paddingHorizontal: 15,
                marginVertical: 5,
                backgroundColor: colors.light.primary,
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Product", {
                    title: item.title,
                    pId: item.id,
                  })
                }
                style={{
                  width: "35%",
                  height: 180,
                }}
              >
                <Image style={styles.image} source={{ uri: item.thumbnail }} />
              </TouchableOpacity>
              <View
                style={{
                  width: "65%",
                  paddingHorizontal: 10,
                  alignContent: "flex-start",
                }}
              >
                <View
                  style={{
                    marginBottom: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    {item.title}
                  </Text>
                  <Ionicons
                    name="trash-outline"
                    size={15}
                    color="black"
                    onPress={() => deleteProduct(item.id)}
                  />
                </View>
                <Text numberOfLines={3} style={{ fontSize: 12 }}>
                  {item.description}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.light.gray,
                    marginVertical: 3,
                  }}
                >
                  BRAND:{" "}
                  <Text style={{ color: colors.light.text }}>{item.brand}</Text>
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: colors.light.red,
                    marginVertical: 2,
                  }}
                >
                  ₹{item.price}{" "}
                  <Text
                    style={{
                      color: colors.light.text,
                      textDecorationLine: "line-through",
                    }}
                  >
                    ₹
                    {parseFloat(
                      (item.price * item.discountPercentage) / 100 + item.price
                    ).toFixed(2)}
                  </Text>
                  {parseInt(item.discountPercentage)}% Off
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: colors.light.text,
                    marginVertical: 3,
                  }}
                >
                  14 Days{" "}
                  <Text
                    style={{ color: colors.light.gray, fontWeight: "normal" }}
                  >
                    return available
                  </Text>
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "normal",
                    color: colors.light.gray,
                    marginVertical: 3,
                  }}
                >
                  Delivery by:{" "}
                  <Text style={{ color: colors.light.text, fontWeight: "600" }}>
                    30 August
                  </Text>
                </Text>
              </View>
            </View>
          ))}
          <View
            style={{
              width: "100%",
              paddingVertical: 5,
              paddingHorizontal: 15,
              marginVertical: 5,
              backgroundColor: colors.light.primary,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "600" }}>
              Product details{" "}
              <Text style={{ fontWeight: "normal" }}>
                ({documentCount} items)
              </Text>
            </Text>
            <View style={styles.horizontalLine}></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 3,
              }}
            >
              <Text style={{ fontSize: 13, color: colors.light.gray }}>
                Total MRP
              </Text>
              <Text style={{ fontSize: 13, color: colors.light.text }}>
                ₹4657
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 3,
              }}
            >
              <Text style={{ fontSize: 13, color: colors.light.gray }}>
                Discount on MRP
              </Text>
              <Text style={{ fontSize: 13, color: colors.light.text }}>
                -₹2174
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 3,
              }}
            >
              <Text style={{ fontSize: 13, color: colors.light.gray }}>
                Convenience Fee
              </Text>
              <Text style={{ fontSize: 13, color: colors.light.text }}>
                ₹50
              </Text>
            </View>
            <View style={styles.horizontalLine}></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: colors.light.text,
                  fontWeight: "600",
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.light.text,
                  fontWeight: "600",
                }}
              >
                ₹2150
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[styles.bottomBtn, { backgroundColor: colors.light.pink }]}
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: colors.light.primary,
            }}
          >
            Place order
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 180,
    marginVertical: 5,
  },
  bottom: {
    width: "100%",
    height: 50,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  bottomBtn: {
    width: "100%",
    height: 50,
    borderTopWidth: 0,
    borderWidth: 0.5,
    borderColor: colors.light.pink,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  horizontalLine: {
    borderBottomColor: colors.light.secondary,
    borderBottomWidth: 1,
    marginVertical: 5,
  },
});

export default Basket;
