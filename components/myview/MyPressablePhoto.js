import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

const MyPressable = (props) => {
  const { containerPress, funt, textPress, val } = props;

  return (
    <View style={containerPress}>
      <Pressable onPress={funt}>
        <Text style={{ fontSize: 8 }}>{val}</Text>
      </Pressable>
    </View>
  );
};

export default MyPressable;

const styles = StyleSheet.create({});
