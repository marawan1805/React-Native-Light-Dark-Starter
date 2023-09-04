import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ToastAndroid,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../config/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

const Product = ({ route }) => {
  const { pId } = route.params;
  const navigation = useNavigation();

  const [userEmail, setUserEmail] = useState("");
  const [product, setProduct] = useState([]);
  const [liked, setLiked] = useState(null);
  const [basket, setBasket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const screenWidth = Dimensions.get("window").width;

  const handleWishlistBtn = async (price) => {
    if (liked == null) {
      setLiked(pId);
      const subCollRef = collection(db, "users/" + userEmail + "/wishlist/");
      const customDocRef = doc(subCollRef, "product" + pId);
      await setDoc(customDocRef, {
        productId: pId,
        price,
      })
        .then(() => {
          getWishlist(userEmail);
          ToastAndroid.show("Added to wishlist.", ToastAndroid.BOTTOM);
        })
        .catch((err) => {
          ToastAndroid.show("Something went wrong.", ToastAndroid.BOTTOM);
        });
    } else {
      setLiked(null);
      const subCollRef = collection(db, "users/" + userEmail + "/wishlist/");
      await deleteDoc(doc(subCollRef, "product" + pId))
        .then(() => {
          getWishlist(userEmail);
          ToastAndroid.show("Removed from wishlist.", ToastAndroid.BOTTOM);
        })
        .catch((err) => {
          ToastAndroid.show("Something went wrong.", ToastAndroid.BOTTOM);
        });
    }
  };

  const getWishlist = async (email) => {
    const getWishlist = await getDocs(
      query(
        collection(db, "users", email, "wishlist"),
        where("productId", "==", pId)
      )
    );
    getWishlist.forEach((doc) => {
      setLiked(doc.data().productId);
      setUserEmail(email);
    });
  };

  const getBasket = async (email) => {
    const getBasket = await getDocs(
      query(
        collection(db, "users", email, "basket"),
        where("productId", "==", pId)
      )
    );
    getBasket.forEach((doc) => {
      setBasket(doc.data().productId);
      setUserEmail(email);
    });
  };

  const handleBasketBtn = async (price) => {
    if (basket == null) {
      setBasket(pId);
      const subCollRef = collection(db, "users/" + userEmail + "/basket/");
      const customDocRef = doc(subCollRef, "product" + pId);
      await setDoc(customDocRef, {
        productId: pId,
        price,
      })
        .then(() => {
          getBasket(userEmail);
          ToastAndroid.show("Added to basket.", ToastAndroid.BOTTOM);
        })
        .catch((err) => {
          ToastAndroid.show("Something went wrong.", ToastAndroid.BOTTOM);
        });
    } else {
      navigation.navigate("Basket");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const url = "https://dummyjson.com/product/" + pId;
      try {
        const response = await fetch(url);
        const result = await response.json();
        setProduct(result);
        setIsLoading(false);
      } catch (error) {
        ToastAndroid.show(error, ToastAndroid.SHORT);
        setIsLoading(false);
      }
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        getBasket(email);
        getWishlist(email);
        setUserEmail(email);
      } else {
        console.log("User is signed out.");
      }
    });

    fetchProduct();
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: colors.light.primary,
          marginBottom: 50,
        }}
      >
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
        >
          {product.images.map((imageSource, index) => (
            <Image
              key={index}
              style={{
                width: screenWidth,
                height: 500,
              }}
              source={{ uri: imageSource }}
            />
          ))}
        </ScrollView>
        {/* Text infos area */}
        <View style={styles.textContainer}>
          <Text
            style={[styles.title, { color: colors.light.text }]}
            numberOfLines={1}
          >
            {product.title}{" "}
            <Text style={{ fontWeight: "normal" }}>by {product.brand}</Text>
          </Text>
          <Text style={[styles.description, { color: colors.light.tertiary }]}>
            {product.description}
          </Text>
          <Text style={[styles.price, { color: colors.light.text }]}>
            <Text
              style={{
                color: colors.light.tertiary,
                fontWeight: "normal",
                fontStyle: "italic",
                textDecorationLine: "line-through",
              }}
            >
              ₹
              {parseFloat(
                (product.price * product.discountPercentage) / 100 +
                  product.price
              ).toFixed(2)}
            </Text>{" "}
            ₹{product.price}{" "}
            <Text style={{ color: colors.light.red, fontWeight: "normal" }}>
              {parseInt(product.discountPercentage)}% Off
            </Text>
          </Text>
        </View>
        <View style={styles.space}></View>
        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Delivery Status
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 15,
              borderBottomWidth: 0.5,
              borderBottomColor: colors.light.gray,
            }}
          >
            <Text style={{ fontSize: 14 }}>
              Deliver to:{" "}
              <Text style={{ fontWeight: "700" }}>Ranchi - 834001</Text>{" "}
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,
                borderColor: colors.light.gray,
                borderWidth: 0.5,
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                Add/Change
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <MaterialCommunityIcons
              name="truck-delivery-outline"
              size={24}
              color="black"
            />
            <View>
              <Text>Delivered by 2 Aug, Tuesday</Text>
              <Text
                style={{
                  color: colors.light.red,
                }}
              >
                If ordered within 1 hours.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </View>
        </View>
        <View style={styles.space}></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="police-badge-outline"
              size={24}
              color={colors.light.red}
            />
            <Text>Genuine Product</Text>
          </View>
          <View
            style={{
              width: 1,
              height: 40,
              borderWidth: 0.5,
              borderColor: colors.light.red,
            }}
          ></View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="bookmark-check-outline"
              size={24}
              color={colors.light.red}
            />
            <Text>Quality Checked</Text>
          </View>
        </View>
        <View style={styles.space}></View>
      </ScrollView>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[
            styles.bottomBtn,
            { backgroundColor: colors.light.secondary },
          ]}
          onPress={() => handleWishlistBtn(product.price)}
        >
          <Ionicons
            name={liked == pId ? "heart" : "heart-outline"}
            size={17}
            color={colors.light.pink}
          />
          {liked == pId ? (
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: colors.light.pink,
              }}
            >
              {" "}
              Wishlisted
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 14,
                color: colors.light.text,
              }}
            >
              {" "}
              Add to Wishlist
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomBtn, { backgroundColor: colors.light.red }]}
          onPress={() => handleBasketBtn(product.price)}
        >
          <Ionicons
            name={basket == pId ? "basket" : "basket-outline"}
            size={17}
            color={colors.light.primary}
          />
          <Text
            style={{
              fontSize: 14,
              color: colors.light.primary,
              fontWeight: "600",
            }}
          >
            {" "}
            {basket == pId ? "Go" : "Add"} to Basket
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
  textContainer: {
    padding: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#7a7a7a",
    marginBottom: 5,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 5,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F5FCFF",
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
    width: "50%",
    height: 50,
    borderTopWidth: 0,
    borderWidth: 0.5,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  space: {
    width: "100%",
    height: 10,
    backgroundColor: "#ccc",
  },
});

export default Product;
