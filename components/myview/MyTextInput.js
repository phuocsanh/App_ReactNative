import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const MyTextInput = (props) => {
  const {
    textInputContainer,
    textInput,
    placeholder,
    val,
    changeText,
    secureTextEntry,
    multiline,
  } = props;
  return (
    <View style={textInputContainer}>
      <TextInput
        style={textInput}
        placeholder={placeholder}
        value={val}
        // changeText={changeText}
        onChangeText={changeText}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
      ></TextInput>
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({});
