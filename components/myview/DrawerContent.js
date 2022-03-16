import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Button,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Home";

function DrawerContent({ navigation }) {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      {/* <Drawer.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Drawer.Navigator>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  containerPress: {
    height: 50,
    backgroundColor: "blue",
  },
  textPress: {
    fontSize: 30,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    padding: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginBottom: 15,
    borderTopColor: "blue",
    borderTopWidth: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "yellow",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
