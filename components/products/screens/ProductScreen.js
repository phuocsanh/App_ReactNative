import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  Alert,
  Modal,
  Share,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { ProductContext } from "../ProductContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingAction } from "react-native-floating-action";
import { FAB, TextInput } from "react-native-paper";
import MyPressable from "../../myview/MyPressable";
import { TouchableOpacity } from "react-native-gesture-handler";
const ProductScreen = (props) => {
  const {
    container,
    flatStyle,
    rederItem,
    priceStyle,
    nameStyle,
    containerCategories,
    textTittleName,
    viewCategorires,
    textCategories,
    flatStyleCategories,
    containerUpdateInsert,
    textDelete,
    textUpdate,
    viewModal,

    containerPress,
    Images,
    textContent,
    textTittle,
    viewTitle,
    viewTitleDescription,
    viewTitleImages,
    textPress,
    viewImg,
  } = styles;
  const { products, categories, onGetProducts, onDeleteProduct } =
    useContext(ProductContext);
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(categories[4]?.id);
  const [modalVisible, setModalVisible] = useState(false);

  const [name1, setName1] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("");
  const openSettingsModal = (
    name,
    price,
    description,
    published,
    quantity,
    images
  ) => {
    // console.log(name + "name modal");
    setName1(name);
    setPrice(price);
    setDescription(description);
    setPublished(published);
    setQuantity(quantity);
    setImages(images);
    setModalVisible(!modalVisible);
  };
  const onSeclectCategories = async (id1) => {
    onGetProducts(id1);
    setSelectedCategory(id1);
    // console.log(id1 + " Product creen");
  };
  const displayTime = (time) => {
    if (!time) time = new Date();
    else if (!(time instanceof Date)) time = new Date(time.toDate());
    let date = time.getDate();
    let month = time.getMonth() + 1;
    let year = time.getFullYear();
    return date + "/" + month + "/" + year;
  };
  const onConfirm = (id) => {
    Alert.alert(
      "Xác Nhận",
      "Bạn muốn xóa sản phẩm này?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => onDeleteProduct(id, selectedCategory),
        },
      ],
      { cancelable: false }
    );
  };
  const setVisibleAndSetIdProduct = () => {
    setModalVisible(true);
    setIdProduct();
  };
  // const filterProduct = products.filter((val, index, arr) => {
  //   val.name = filter;
  //   return val.name;
  // });
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const renderItem = (val) => {
    const {
      item: { name, quantity, published, description, price, images, id },
    } = val;
    // console.log(name + "name");

    return (
      <View style={rederItem}>
        <Text style={nameStyle}>{name}</Text>

        {/* {images.map((img, index, arr) => {
          return (
            <Image
              source={{ uri: img }}
              key={Math.random()}
              style={{ width: 150, height: 150 }}
              resizeMode={"contain"}
            />
          );
        })} */}
        <TouchableOpacity
          onPress={() =>
            openSettingsModal(
              name,
              price,
              description,
              published,
              quantity,
              images
            )
          }
        >
          <Image
            style={{ width: 150, height: 150, resizeMode: "contain" }}
            source={{ uri: images[0] }}
          ></Image>
        </TouchableOpacity>

        <Text style={priceStyle}> {price + " VND"}</Text>

        <Text> {displayTime(published)}</Text>
        <View style={containerUpdateInsert}>
          <Pressable style={textDelete} onPress={onShare}>
            <Text style={{ color: "white" }}>Share</Text>
          </Pressable>
          <Pressable
            style={textUpdate}
            onPress={() =>
              navigation.navigate("ProductFormScreen", {
                product1: val.item,
                categoryId: selectedCategory,
              })
            }
          >
            <Text style={{ color: "white" }}>Update</Text>
          </Pressable>
          <Pressable style={textDelete} onPress={() => onConfirm(id)}>
            <Text style={{ color: "white" }}>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const renderItemCategories = (val1) => {
    const {
      item: { name, id },
    } = val1;

    return (
      <View style={viewCategorires}>
        <Text onPress={() => onSeclectCategories(id)} style={textCategories}>
          {name}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={container}>

      <View
        style={{
          width: "100%",
          height: "5%",

        }}
      >
        <FlatList
          style={flatStyleCategories}
          horizontal={true}
          data={categories}
          renderItem={renderItemCategories}
        ></FlatList>
      </View>
      <View style={{ width: "100%", height: "85%" }}>
        <FlatList
          style={flatStyle}
          data={products}
          renderItem={renderItem}
          numColumns={2}
        />
      </View>


      <FAB
        style={{
          width: 40,
          height: 40,
          backgroundColor: "#E6078F",
        }}
        small
        icon="plus"
        onPress={() =>
          navigation.navigate("ProductFormScreen", {
            product1: {
              images: [],
              name: "",
              price: "",
              quantity: "",
              published: new Date(),
              description: "",
              categoryKey: selectedCategory,
              id: null,
            },
            categoryId: selectedCategory,
          })
        }
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType={"slide"}
        onRequestClose={() => console.log("Modal close")}
      >
        <View style={viewModal}>
          <View style={viewTitle}>
            <Text style={textTittleName}>Name</Text>
            <Text style={textContent}>{name1}</Text>
          </View>
          <View style={viewTitleImages}>
            <Text style={textTittleName}>Images</Text>
            <View style={viewImg}>
              {images.map((val, index, arr) => (
                <Image
                  style={Images}

                  source={{ uri: val }}
                  key={index}
                />
              ))}
            </View>
          </View>
          <View style={viewTitle}>
            <Text style={textTittle}>Price</Text>
            <Text style={textContent}>{price}</Text>
          </View>
          <View style={viewTitle}>
            <Text style={textTittle}>Published</Text>
            <Text style={textContent}>{displayTime(published)} </Text>
          </View>
          <View style={viewTitle}>
            <Text style={textTittle}>Quantity</Text>
            <Text style={textContent}>{quantity.toString()} </Text>
          </View>
          <View style={viewTitleDescription}>
            <Text style={textTittle}>Description</Text>
            <Text> {description.length > 150 ? `${description.slice(0, 150)}...` : description} </Text>
          </View>

          <MyPressable
            containerPress={containerPress}
            val={"OK"}
            textPress={textPress}
            funt={() => setModalVisible(false)}
          />

        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  viewImg: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  Images: {
    borderRadius: 6,
    marginRight: 10,
    width: 100, height: 100,
    marginBottom: 10,

  },
  viewTitle: {
    marginTop: "2%",
    height: "8%",

    flexDirection: "column",
  },
  viewTitleImages: {
    marginTop: "2%",
    height: "22%",

    flexDirection: "column",
  },
  viewTitleDescription: {
    marginTop: "2%",
    height: "30%",

    flexDirection: "column",
  },
  textPress: {
    color: "white",
  },
  textTittle: {
    marginTop: "10%",
    paddingLeft: "8%",
    backgroundColor: "#E6078F",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    color: "white",
  },
  textTittleName: {
    marginTop: "5%",
    paddingLeft: "8%",
    backgroundColor: "#E6078F",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    color: "white",
  },
  textContent: { marginLeft: "5%" },
  viewModal: {
    paddingTop: "2%",
    flex: 1,
    width: "80%",
    maxHeight: "80%",
    marginTop: "30%",
    borderWidth: 2,
    borderColor: "#99009e",
    borderRadius: 30,
    marginLeft: "10%",
    marginRight: "10%",
    flexDirection: "column",
    position: "absolute",
    backgroundColor: "#faf0fc",
  },
  containerPress: {
    marginTop: "5%",
    position: "absolute",
    right: 10,
    bottom: 10,
    width: "20%",
    height: 15,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#E6078F",
  },
  containerUpdateInsert: {
    width: "100%",

    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
  },
  textUpdate: {
    padding: 2,
    borderRadius: 3,
    color: "white",
    backgroundColor: "#99009e",
  },
  textDelete: {
    padding: 2,
    color: "white",
    borderRadius: 3,
    backgroundColor: "#99009e",
  },
  containerCategories: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    backgroundColor: "black",
    marginBottom: "2%",
  },

  viewCategorires: {
    backgroundColor: "#99009e",
    borderWidth: 2,
    height: "90%",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    borderColor: "#8b0b8c",
    borderRadius: 5,
  },
  textCategories: {
    fontSize: 20,

    color: "white",
  },
  priceStyle: {
    fontSize: 16,
    padding: 2,
    borderRadius: 5,
    fontStyle: "italic",
    backgroundColor: "#E6078F",
    marginTop: 4,
    color: "white",
  },
  nameStyle: {
    color: "#770765",
    fontSize: 15,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: "blue",
  },
  flatStyle: {
    height: "90%",
    marginTop: 5,
  },
  flatStyleCategories: { height: "10%" },
  rederItem: {
    width: "48%",
    padding: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6078F",
    margin: "1%",
    borderRadius: 8,
  },
});
