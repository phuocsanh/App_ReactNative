import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import MyPressable from "../../myview/MyPressable";
import MyPressablePhoto from "../../myview/MyPressablePhoto";

import { UserContext } from "../../users/UserContext";
import { useNavigation } from "@react-navigation/core";
import MyTextInput from "../../myview/MyTextInput";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { ProductContext } from "../ProductContext";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import ViewPager from "react-native-pager-view";
import { Modal } from "react-native-paper";

const ProductFormScreen = (props) => {
  const { onLogout } = useContext(UserContext);
  const { onUpdateProducts, categories, onUploadImg, onInsertProduct } =
    useContext(ProductContext);

  const {
    route: {
      params: { product1, categoryId },
    },
  } = props;
  const navigation = useNavigation();
  console.log(categoryId + " Product From");

  if (!product1) {
    return (
      <View>
        <Text>Product not found</Text>
      </View>
    );
  }
  const [selectedCategories, setSelectedCategories] = useState(
    categoryId || categories[0].id
  );
  const [nameError, setNameError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [quantityError, setQuantityError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [name, setName] = useState(product1.name);
  const [price, setPrice] = useState(product1.price);
  const [description, setDescription] = useState(product1.description);
  const [published, setPublished] = useState(product1.published || new Date());
  const [quantity, setQuantity] = useState(product1.quantity);
  const [images, setImages] = useState(product1.images);
  const [dateTimeModalVisible, setDateTimeModalVisible] = useState(false);
  const [startCamera, setStartCamera] = useState(false);

  const {
    containerView,
    container,
    containerTextIput,
    textPress,
    container1,
    containerPress,
    textInput,
    containerScrollView,
    label1,
    textInputDes,
    containerViewDes,
    containerTextIputDescription,
    containerViewImages,
    Images,
    pickerView,
    cameraStyle,
    containerViewCamera,
    containerPressCamera,
    containerPressCameraTake,
    containerPressTakePhoto,
    addImg,
    viewImg,
    textAddImg,
  } = styles;
  let p = {
    images: images,
    name: name,
    price: price,
    quantity: quantity,
    published: published,
    description: description,
    categoryKey: selectedCategories,
    id: product1.id,
  };
  const validateName = (valueName) => {
    if (!valueName || valueName.length < 1) setNameError("Tên không hợp lệ");
    else setNameError(null);
    setName(valueName);
  };
  const validatePrice = (valuePrice) => {
    if (!valueName || valueName.length < 1) setNameError("Tên không hợp lệ");
    else setNameError(null);
    setName(valueName);
  };
  const displayTime = (time) => {
    if (!time) time = new Date();
    else if (!(time instanceof Date)) time = new Date(time.toDate());
    let date = time.getDate();
    let month = time.getMonth() + 1;
    let year = time.getFullYear();
    return date + "/" + month + "/" + year;
  };

  const onSaveProduct = async () => {
    if (nameError) {
      return;
    }
    if (product1.id) {
      //update
      await onUpdateProducts(p);
    } else {
      //insert
      await onInsertProduct(p);
    }
    navigation.goBack();
  };
  //  Camera
  let camera = null;
  const onStartCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      console.log("Camera not allow");
    }
  };
  const onTakePhoto = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync({ quanlity: 0.2 });
    console.log(photo);
    setStartCamera(false);
    const url = await onUploadImg(photo);
    console.log(url + "  url");
    setImages([...images, url]);
  };
  const onOpenImagePicker = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted == false) {
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      quanlity: 0.2,
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    const url = await onUploadImg(pickerResult);
    setImages([...images, url]);
    setStartCamera(false);
  };

  return (
    <>
      {startCamera ? (
        <Camera
          ref={(r) => {
            camera = r;
          }}
          style={cameraStyle}
        >
          <View style={containerViewCamera}>
            <MyPressablePhoto
              val="Close"
              containerPress={containerPressCamera}
              funt={() => setStartCamera(false)}
            >

            </MyPressablePhoto>
          </View>

          <View style={containerViewCamera}>
            <MyPressablePhoto
              val="Take"
              containerPress={containerPressCameraTake}
              funt={onTakePhoto}
            ></MyPressablePhoto>
          </View>
          <View style={containerViewCamera}>
            <MyPressablePhoto
              val="Library"
              containerPress={containerPressTakePhoto}
              funt={onOpenImagePicker}
            ></MyPressablePhoto>
          </View>
        </Camera>
      ) : (
        <KeyboardAvoidingView style={container}>
          <ScrollView style={containerScrollView}>
            <View style={container1}>
              <View style={viewImg}>
                <Text
                  style={{
                    backgroundColor: "#d1065b",
                    width: "90%",
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    color: "white",
                    paddingLeft: "5%",
                  }}
                >
                  Images Product
                </Text>
                <MyPressable
                  funt={onStartCamera}
                  val={"+"}
                  textPress={textAddImg}
                  containerPress={addImg}
                />
              </View>

              <View style={containerViewImages}>
                {/* <ViewPager
                  style={{ flex: 1 }}
                  initialPage={0}
                  orientation={"horizontal"}
                > */}

                {images.map((val, index, arr) => (
                  <Image
                    style={Images}

                    source={{ uri: val }}
                    key={index}
                  />
                ))}

                {/* </ViewPager> */}
              </View>
              <View style={containerView}>
                <Text style={label1}>Name</Text>
                <MyTextInput
                  textInput={textInput}
                  textInputContainer={containerTextIput}
                  val={name}
                  changeText={(valueName) => validateName(valueName)}
                />
              </View>
              {nameError ? (
                <Text style={{ marginTop: 5 }}>{`${nameError}`}</Text>
              ) : (
                <></>
              )}

              <View style={containerView}>
                <Text style={label1}>Price</Text>
                <MyTextInput
                  textInput={textInput}
                  textInputContainer={containerTextIput}
                  val={price}
                  changeText={setPrice}
                />
              </View>
              <View style={containerView}>
                <Text style={label1}>Published</Text>

                <View style={containerTextIput}>
                  <Text
                    onPress={() => setDateTimeModalVisible(true)}
                    style={textInput}
                  >
                    {displayTime(published)}
                  </Text>
                </View>

                <DateTimePickerModal
                  isVisible={dateTimeModalVisible}
                  mode="date"
                  onConfirm={(date) => {
                    setPublished(date);
                    setDateTimeModalVisible(false);
                  }}
                  onCancel={() => setDateTimeModalVisible(false)}
                />
              </View>

              <View style={containerView}>
                <Text style={label1}>Quantity</Text>
                <MyTextInput
                  textInput={textInput}
                  textInputContainer={containerTextIput}
                  val={quantity.toString()}
                  changeText={setQuantity}
                />
              </View>

              <View style={containerViewDes}>
                <Text style={label1}>Description</Text>
                <MyTextInput
                  textInput={textInputDes}
                  textInputContainer={containerTextIputDescription}
                  val={description}
                  multiline={true}
                  changeText={setDescription}
                />
              </View>
              <View style={pickerView}>
                <Text
                  style={{
                    backgroundColor: "#d1065b",
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    paddingLeft: "5%",
                    color: "white",
                  }}
                >
                  Categories
                </Text>
                <Picker
                  selectedValue={selectedCategories}
                  onValueChange={(val1, index) => {
                    setSelectedCategories(val1);
                  }}
                >
                  {categories.map((val, index, arr) => (
                    <Picker.Item
                      key={val.id}
                      label={val.name.toString()}
                      value={val.id}
                    />
                  ))}
                </Picker>
              </View>

              <MyPressable
                containerPress={containerPress}
                funt={() => onSaveProduct(p)}
                textPress={textPress}
                val={"Save"}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default ProductFormScreen;

const styles = StyleSheet.create({
  textAddImg: {
    fontSize: 25,
    color: "white",
  },
  viewImg: {
    width: "80%",
    flexDirection: "row",

    alignItems: "center",
  },
  cameraStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  addImg: {
    backgroundColor: "blue",
    borderRadius: 50,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
    width: "10%",
  },
  containerViewCamera: {
    flex: 1,
    paddingTop: "3%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: "8%",
    backgroundColor: "black",
  },
  containerPressCamera: {
    backgroundColor: "#f7b125",
    width: "25%",
    height: "70%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerPressCameraTake: {
    width: "40%",
    height: "70%",
    borderRadius: 90,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerPressTakePhoto: {
    width: "40%",
    height: "70%",
    borderRadius: 90,
    backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textPress: {
    color: "white",
  },
  pickerView: {
    height: 50,
    width: 150,
    marginTop: "6%",
    backgroundColor: "white",
    borderRadius: 5,
  },

  containerPress: {
    backgroundColor: "#f7b125",
    marginTop: "5%",
    width: "20%",
    height: 30,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  containerScrollView: {
    flex: 1,
    width: "100%",
    marginTop: 30,
    minHeight: 550,
    // backgroundColor: "green",
  },
  container: {
    flex: 1,
    width: "100%",
    minHeight: 550,
    // backgroundColor: "red",
  },

  container1: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: "blue",
    flexDirection: "column",
    alignItems: "center",
  },
  containerView: {
    marginTop: "4%",
    backgroundColor: "#d1065b",
    width: "80%",
    height: 50,
    borderRadius: 6,
  },
  containerViewDes: {
    marginTop: "4%",
    backgroundColor: "#d1065b",
    width: "80%",
    height: 150,
    borderRadius: 6,
  },
  containerViewImages: {
    flex: 1,
    width: "100%",
    // backgroundColor: "red",
    marginTop: "2%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  Images: {
    marginLeft: "5%",
    borderRadius: 6,
    backgroundColor: "white",
    width: 100, height: 100
  },
  containerTextIput: {
    width: "100%",
    height: 30,
  },

  containerTextIputDescription: {
    width: "100%",
    height: "100%",
  },
  textInput: {
    width: "100%",
    height: 30,
    paddingLeft: "5%",
    borderRadius: 6,
    backgroundColor: "white",
  },
  textInputDes: {
    width: "100%",
    height: "90%",
    paddingLeft: "5%",
    borderRadius: 6,
    backgroundColor: "white",
  },
  label1: { paddingLeft: "5%", color: "white" },
});
