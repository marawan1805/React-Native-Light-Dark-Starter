import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { colors } from "../../config/theme";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const halfScreenWidth = screenWidth / 2;

const FeaturedItemsSection = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const limit = 6;

      const url = "https://dummyjson.com/products?limit=" + limit;

      try {
        const response = await fetch(url);
        const result = await response.json();
        setProducts(result.products);
      } catch (error) {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      }
    };

    fetchProducts();
  }, []);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "500",
            paddingHorizontal: 10,
            marginTop: 20,
            marginBottom: 15,
            color: colors.light.text,
          }}
        >
          Featured Items
        </Text>
        <Text
          style={{
            fontSize: 14,
            paddingHorizontal: 10,
            marginTop: 20,
            marginBottom: 15,
            color: colors.light.red,
          }}
          onPress={() =>
            navigation.navigate("Shop", {
              title: "Featured Items",
            })
          }
        >
          See all
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {products.map((items, rowIndex) => (
          <View
            key={rowIndex}
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              style={[
                styles.container,
                {
                  backgroundColor: colors.light.primary,
                  borderColor: colors.light.gray,
                },
              ]}
              onPress={() =>
                navigation.navigate("Product", {
                  title: items.title,
                  pId: items.id,
                })
              }
            >
              <Image style={styles.image} source={{ uri: items.thumbnail }} />
              <View style={styles.textContainer}>
                <Text
                  style={[styles.title, { color: colors.light.text }]}
                  numberOfLines={1}
                >
                  {items.title}
                </Text>
                <Text
                  style={[styles.description, { color: colors.light.tertiary }]}
                  numberOfLines={1}
                >
                  {items.description}
                </Text>
                <Text
                  style={[styles.price, { color: colors.light.text }]}
                  numberOfLines={1}
                >
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
                      (items.price * items.discountPercentage) / 100 +
                        items.price
                    ).toFixed(2)}
                  </Text>{" "}
                  ₹{items.price}{" "}
                  <Text
                    style={{
                      color: colors.light.red,
                      fontWeight: "normal",
                    }}
                  >
                    {parseInt(items.discountPercentage)}% Off
                  </Text>
                </Text>
                <Text
                  style={{ color: colors.light.tertiary, fontSize: 12 }}
                  numberOfLines={1}
                >
                  <Ionicons name="star" size={12} color={colors.light.red} />
                  {items.rating}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: halfScreenWidth,
    padding: 10,
    borderWidth: 0.5,
  },
  textContainer: {
    padding: 0,
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: 15,
  },
  description: {
    fontSize: 11,
    color: "#7a7a7a",
  },
  price: {
    fontSize: 13,
    fontWeight: "700",
  },
  wishlist: {
    marginTop: -45,
    marginLeft: 5,
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#ddd",
    paddingLeft: 2.5,
    paddingTop: 3,
  },
});

export default FeaturedItemsSection;
