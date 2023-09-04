import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  useContext,
} from "react";
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
import { ThemeContext } from "../context/ThemeContext";
import { TabView, SceneMap } from "react-native-tab-view";

import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const screenWidth = Dimensions.get("window").width;
const halfScreenWidth = screenWidth / 2;

const Shop = ({ route }) => {
  const { query } = route.params;
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const sortSnapPoints = useMemo(() => ["25%", "50%"], []);
  const filterSnapPoints = useMemo(() => ["25%", "75%"], []);

  const filterSheetModalRef = useRef(null);
  const sortSheetModalRef = useRef(null);

  const tabs = [
    { id: 0, title: "Size", content: "Filter tab container for Size" },
    { id: 1, title: "Color", content: "Filter tab container for Color" },
    { id: 2, title: "Brand", content: "Filter tab container for Brand" },
    { id: 3, title: "Rating", content: "Filter tab container for Rating" },
    { id: 4, title: "Gender", content: "Filter tab container for Gender" },
    { id: 5, title: "Category", content: "Filter tab container for Category" },
    {
      id: 6,
      title: "Price Range",
      content: "Filter tab container for Price Range",
    },
  ];

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  const filterModalPress = useCallback(() => {
    filterSheetModalRef.current?.present();
    setActiveTab(0);
  }, []);

  const filterModalDown = () => {
    filterSheetModalRef.current.dismiss();
    setActiveTab(0);
  };

  const sortModalPress = useCallback(() => {
    sortSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const limit = "20";

      if (query == undefined) {
        const url = "https://dummyjson.com/products";

        try {
          const response = await fetch(url);
          const result = await response.json();
          setProducts(result.products);
          setIsLoading(false);
        } catch (error) {
          ToastAndroid.show(error, ToastAndroid.SHORT);
          setIsLoading(false);
        }
      } else {
        const url = "https://dummyjson.com/products/search?q=" + query;

        try {
          const response = await fetch(url);
          const result = await response.json();
          setProducts(result.products);
          if (result.total == 0) {
            const url = "https://dummyjson.com/products";

            try {
              const response = await fetch(url);
              const result = await response.json();
              setProducts(result.products);
              ToastAndroid.show(
                "0 products matched. Showing randomly",
                ToastAndroid.LONG
              );
              setIsLoading(false);
            } catch (error) {
              ToastAndroid.show(error, ToastAndroid.SHORT);
              setIsLoading(false);
            }
          }
          setIsLoading(false);
        } catch (error) {
          ToastAndroid.show(error, ToastAndroid.SHORT);
          setIsLoading(false);
        }
      }
    };

    fetchProducts();
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
    <BottomSheetModalProvider>
      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: 50,
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
                  <Image
                    style={styles.image}
                    source={{ uri: items.thumbnail }}
                  />
                  <View style={styles.textContainer}>
                    <Text
                      style={[styles.title, { color: colors.light.text }]}
                      numberOfLines={1}
                    >
                      {items.title}
                    </Text>
                    <Text
                      style={[
                        styles.description,
                        { color: colors.light.tertiary },
                      ]}
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
                      <Ionicons
                        name="star"
                        size={12}
                        color={colors.light.red}
                      />
                      {items.rating}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={[
              styles.bottomBtn,
              { backgroundColor: colors.light.secondary },
            ]}
            onPress={() => sortModalPress()}
          >
            <MaterialCommunityIcons
              name="sort-descending"
              size={17}
              color="black"
            />
            <Text style={{ fontSize: 18 }}> Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.bottomBtn,
              { backgroundColor: colors.light.secondary },
            ]}
            onPress={() => filterModalPress()}
          >
            <AntDesign name="filter" size={17} color="black" />
            <Text style={{ fontSize: 18 }}> Filter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomSheet}>
          <BottomSheetModal
            ref={sortSheetModalRef}
            index={1}
            snapPoints={sortSnapPoints}
          >
            <View
              style={[
                styles.contentContainer,
                { backgroundColor: colors.light.primary },
              ]}
            >
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 16,
                  marginBottom: 5,
                }}
              >
                {" "}
                <Text
                  style={{
                    fontWeight: "600",
                  }}
                >
                  Sort
                </Text>{" "}
                By
              </Text>
              <TouchableOpacity style={styles.listView}>
                <Text style={styles.listViewText}>Relevance</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.listView}>
                <Text style={styles.listViewText}>Popularity</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.listView}>
                <Text style={styles.listViewText}>Newest Firts</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.listView}>
                <Text style={styles.listViewText}>Price - Low to High</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.listView}>
                <Text style={styles.listViewText}>Price - High to Low</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetModal>
          <BottomSheetModal
            ref={filterSheetModalRef}
            index={1}
            snapPoints={filterSnapPoints}
          >
            <View
              style={[
                styles.contentContainer,
                { backgroundColor: colors.light.primary, paddingHorizontal: 0 },
              ]}
            >
              <Text
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Filter Items
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                  borderTopWidth: 0.5,
                  borderColor: "#ddd",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                <View>
                  {tabs.map((tab, index) => (
                    <TouchableOpacity
                      key={tab.id}
                      style={[
                        styles.tabButton,
                        index === activeTab && styles.activeTabButton,
                      ]}
                      onPress={() => handleTabPress(index)}
                    >
                      <Text
                        style={[
                          styles.tabButtonText,
                          index === activeTab && styles.activeTabButtonText,
                        ]}
                      >
                        {tab.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.tabContentContainer}>
                  <Text style={styles.tabContentText}>
                    {tabs[activeTab].content}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  backgroundColor: colors.light.primary,
                  paddingVertical: 9,
                  borderTopWidth: 1,
                  borderColor: colors.light.secondary,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "35%",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    backgroundColor: colors.light.secondary,
                    borderRadius: 5,
                    paddingVertical: 12,
                  }}
                  onPress={() => filterModalDown()}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: 1,
                    height: 40,
                    borderWidth: 0.5,
                    borderColor: colors.light.red,
                  }}
                ></View>
                <TouchableOpacity
                  style={{
                    width: "35%",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#f09",
                    backgroundColor: colors.light.pink,
                    borderRadius: 5,
                    paddingVertical: 12,
                  }}
                >
                  <Text
                    style={{
                      color: colors.light.primary,
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetModal>
        </View>
      </>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: halfScreenWidth,
    padding: 10,
    borderWidth: 0.5,
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
    borderWidth: 0.5,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  bottomSheet: {
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  tabButton: {
    paddingHorizontal: 15,
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#eee",
  },
  activeTabButton: {
    backgroundColor: "#fff",
  },
  tabButtonText: {
    fontSize: 16,
    color: "#555",
  },
  activeTabButtonText: {
    color: "#000",
    fontWeight: "600",
  },
  tabContentContainer: {
    flex: 3,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  tabContentText: {
    fontSize: 16,
    fontWeight: "600",
  },
  listView: {
    width: "100%",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderColor: "#F2F2F2",
    borderRadius: 5,
    marginVertical: 2.5,
  },
  listViewText: {
    fontSize: 16,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

export default Shop;
