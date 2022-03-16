import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  View,
  Text,
  CheckBox,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import MyTextInput from "../../myview/MyTextInput";
import MyPressable from "../../myview/MyPressable";
import { UserContext } from "../UserContext";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { onLogin } = useContext(UserContext);
  const [isSelected, setSelected] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passError, setPassError] = useState("");
  const [storeEmail, setStoreEmail] = useState("");
  const [storePass, setStorePass] = useState("");

  const {
    textInput,
    containerTextIput,
    containerPress,
    textPress,
    textPressAble,
    checkboxContainer,
    checkbox,
    textSignIn,
    tinyLogo,
    linearGradient,
    keyboard,
    containerLoginWith,
  } = styles;
  const storeDataAndLogin = async () => {
    try {
      if (isSelected) {
        await AsyncStorage.setItem("Email", email);
        await AsyncStorage.setItem("Pass", password);
      }
      // let mail = await AsyncStorage.getItem("Email");
      // let pass = await AsyncStorage.getItem("Pass");

      // console.log(mail);
      // console.log(pass);
      await onLogin(email, password);
    } catch (error) {
      console.log("Lỗi rồi!");
    }
  };

  useEffect(() => {
    setEmail(AsyncStorage.getItem("Email"));
    setPassword(AsyncStorage.getItem("Pass"));
    console.log(email + "email");
  }, []);
  // const storeData = async () => {
  //   try {
  //     await AsyncStorage.setItem("Email", email);
  //     await AsyncStorage.setItem("Pass", password);
  //     console.log(aaaaaaaaaaaaaaa);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("Email");
  //   } catch (error) {}
  // };

  const validateName = (valueName) => {
    if (valueName.lenght !== 0) {
      setNameError("");
    }
    if (valueName.length == 0 || !valueName) {
      setNameError("Email không hợp lệ");
    }
    setEmail(valueName);
  };
  const validatePass = (valuePass) => {
    // if (valuePass.lenght > 6) {
    //   setPassError("");
    //   setPassword(valuePass);
    // }
    if (!valuePass || valuePass.lenght < 6) {
      setPassError("Mật khẩu ít nhất 6 kí tự");
    } else {
      setPassError("");
    }
    setPassword(valuePass);
  };

  return (
    <KeyboardAvoidingView style={keyboard}>
      <LinearGradient
        style={linearGradient}
        colors={["#410562", "#770765", "#E6078F"]}
      >
        <MyTextInput
          textInput={textInput}
          placeholder={"Enter Email"}
          textInputContainer={containerTextIput}
          changeText={(valueName) => validateName(valueName)}
          val={email}
        />
        <View style={{ marginTop: 10 }}>
          {email ? (
            <></>
          ) : (
            <Text style={{ color: "white" }}>{`${nameError}`}</Text>
          )}
        </View>
        <MyTextInput
          textInput={textInput}
          placeholder={"Enter Password"}
          textInputContainer={containerTextIput}
          changeText={(valuePass) => validatePass(valuePass)}
          secureTextEntry={true}
          val={password}
        />
        <View style={{ marginTop: 10 }}>
          {password ? (
            <></>
          ) : (
            <Text style={{ color: "white" }}>{`${passError}`}</Text>
          )}
        </View>

        <MyPressable
          containerPress={containerPress}
          textPress={textPressAble}
          val={"LOGIN"}
          funt={() => storeDataAndLogin()}
        />

        <View style={checkboxContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelected}
            style={checkbox}
          />
          <Text style={styles.label}>Remember me?</Text>
        </View>

        <Text
          style={textPress}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          I don't have a acount
        </Text>
        <Text style={textSignIn}>----- Sign in with ------</Text>
        <View style={containerLoginWith}>
          <Image
            style={tinyLogo}
            source={{
              uri: "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-128.png",
            }}
          />
          <Image
            style={tinyLogo}
            source={{
              uri: "https://cdn3.iconfinder.com/data/icons/social-network-icon/112/twitter-128.png",
            }}
          />
          <Image
            style={tinyLogo}
            source={{
              uri: "https://cdn4.iconfinder.com/data/icons/social-media-2146/512/3_social-128.png",
            }}
          />
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    flexDirection: "column",
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
  containerLoginWith: {
    flex: 1,
    width: "50%",

    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    marginEnd: 80,
    flexDirection: "row",
    marginTop: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  linearGradient: {
    paddingTop: 150,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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

    fontWeight: "bold",
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
    marginTop: 40,
    borderRadius: 5,
    backgroundColor: "#f7b125",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    height: 40,
  },
  textPress: {
    fontSize: 20,

    fontWeight: "bold",
    marginTop: 10,
    color: "#450000",
  },
  textSignIn: {
    fontSize: 20,

    fontWeight: "bold",
    marginTop: 30,
    color: "white",
  },
});
