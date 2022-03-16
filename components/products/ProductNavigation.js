import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Pressable, Alert } from "react-native";
import { createDrawerNavigator, CancelButton } from "@react-navigation/drawer";
import ProductFormScreen from "./screens/ProductFormScreen";
import ProductScreen from "./screens/ProductScreen";
import { ProductContextProvider } from "./ProductContext";
import { useNavigation } from "@react-navigation/core";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../users/screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FAB } from "react-native-paper";
const Stack = createDrawerNavigator();
const Drawer = createNativeStackNavigator();

import Home from "../myview/Home";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { UserContext } from "../users/UserContext";
const ProductNavigation = (props) => {
  const { onLogout } = useContext(UserContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const getUser = async () => {
    let a = await AsyncStorage.getItem("Email");
    // console.log(a);
    setEmail(a);
  };
  const LogoutAndClear = async () => {
    onLogout();
    await AsyncStorage.clear();
    // console.log(email + " email");
  };
  useEffect(() => {
    getUser();
  }, []);
  const onConfirm = () => {
    Alert.alert(
      "Xác Nhận",
      "Bạn muốn đăng xuất",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => LogoutAndClear(),
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <ProductContextProvider db={props.db}>
      {/* <Stack.Navigator
        // drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#410562",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerBackTitle: "white",
          headerLeft: () => <CancelButton onPress={navigation.goBack} />,
        }}
        initialRouteName="ProductScreen"
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Logout" onPress={onLogout} />
            </DrawerContentScrollView>
          );
        }}
      >
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="ProductFormScreen" component={ProductFormScreen} />
      </Stack.Navigator> */}

      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "#410562",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerBackTitle: "red",

          headerRight: () =>
            !email ? (
              <FAB
                small
                accessibilityLabel="LogOut"
                color={"white"}
                icon={{
                  uri: "https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/38-512.png",
                }}
                onPress={onLogout}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "red",
                }}
              />
            ) : (
              // <FAB
              //   small
              //   accessibilityLabel="LogOut"
              //   color={"white"}
              //   icon={{
              //     uri: "https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/38-512.png",
              //   }}
              //   onPress={onLogout}
              //   style={{
              //     width: 40,
              //     height: 40,
              //     backgroundColor: "red",
              //   }}
              // />
              // <MyPressable funt={onLogout} />
              // <Button title={email} styles={{ fontSize: 10 }}></Button>
              <Pressable onPress={onConfirm}>
                <Text style={{ color: "#E6078F" }}>{email}</Text>
              </Pressable>
            ),
        }}
        initialRouteName="ProductScreen"
        // drawerContent={(props) => {
        //   return (
        //     <DrawerContentScrollView {...props}>
        //       <DrawerItemList {...props} />
        //       <DrawerItem label="Logout" onPress={onLogout} />
        //     </DrawerContentScrollView>
        //   );
        // }}
      >
        <Drawer.Screen name="ProductScreen" component={ProductScreen} />
        <Drawer.Screen name="ProductFormScreen" component={ProductFormScreen} />
      </Drawer.Navigator>
    </ProductContextProvider>
  );
};

export default ProductNavigation;

const styles = StyleSheet.create({
  containerPress: {
    height: 50,
    backgroundColor: "blue",
  },
  textPress: {
    fontSize: 30,
  },
});
