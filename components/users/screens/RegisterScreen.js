import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useNavigation } from "@react-navigation/core";
import MyTextInput from "../../myview/MyTextInput";
import MyPressable from "../../myview/MyPressable";
import { UserContext } from "../UserContext";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { onRegister } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    textInput,
    containerTextIput,
    containerPress,
    textPress,
    textPressAble,
  } = styles;
  return (
    <LinearGradient
      colors={["#410562", "#770765", "#E6078F"]}
      style={styles.linearGradient}
    >
      <MyTextInput
        val={email}
        textInput={textInput}
        changeText={setEmail}
        placeholder={"Enter Email"}
        textInputContainer={containerTextIput}
      />
      <MyTextInput
        val={password}
        changeText={setPassword}
        textInput={textInput}
        placeholder={"Enter Password"}
        textInputContainer={containerTextIput}
        secureTextEntry={true}
      />
      {/* <MyTextInput
        textInput={textInput}
        placeholder={"Confirm Password"}
        val={password}
        changeText={setPassword}
        textInputContainer={containerTextIput}
      /> */}
      {/* <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder={"Enter Email"}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder={"Enter Password"}
      /> */}

      <MyPressable
        containerPress={containerPress}
        textPress={textPressAble}
        funt={() => onRegister(email, password)}
        val={"REGISTER"}
      />
      {/* <Button
        onPress={() => onRegisterCT(email, password)}
        title={"REGISTER"}
      ></Button> */}
      <Text style={textPress} onPress={() => navigation.goBack()}>
        Go to Login
      </Text>
    </LinearGradient>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: 150,
    flex: 1,
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    // margin: 50,
    // borderRadius: 40,
  },
  textStyle: {
    fontSize: 70,
    marginTop: 70,
    marginBottom: 50,
    fontFamily: "courier",
    color: "white",
  },

  textPressAble: {
    fontSize: 20,
    color: "white",
  },

  containerTextIput: {
    marginTop: 20,
    borderRadius: 10,

    backgroundColor: "white",
  },

  textInput: {
    paddingLeft: 10,
    width: 280,
    height: 45,
  },
  containerPress: {
    marginTop: 60,
    borderRadius: 5,
    backgroundColor: "#f7b125",
    // flex: 1,
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "35%",
    height: 40,
  },
  textPress: {
    fontSize: 20,

    fontWeight: "bold",
    marginTop: 30,
    color: "#000338",
  },
});
