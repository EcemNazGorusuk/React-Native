import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const Login = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    try {
      const response = await axios.post(
        "http://116.203.196.162:3000/login",
        {
          email,
          password,
        }
      );

      console.log("Login Success:", response.data);

      const token = response.data.response.token;
      await AsyncStorage.setItem("token", token);
      const userEmail = response.data.response.loginData.user_email;
      await AsyncStorage.setItem("userEmail", userEmail);

      navigation.navigate("Applicants");

    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Giriş Yapılamadı");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logo}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="arrow-back"
          style={styles.logoText}
        ></Ionicons>
      </TouchableOpacity>
      <View style={styles.title}>
        <Text style={styles.titleText}>Login</Text>
      </View>
      <View>
        <Image
          source={require("../assets/Logo.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Hello There 🖐</Text>
      </View>
      <View style={styles.subtitle}>
        <Text style={styles.subtitleText}>
          Login first to continue
        </Text>
      </View>
      <View style={styles.formLayout}>
        <View
          style={[styles.inputContainer, styles.emailInput]}
        >
          <TextInput
            style={[styles.input, styles.inputPosition]}
            placeholder="Email Address"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View
          style={[styles.inputContainer, styles.passwordInput]}
        >
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye-outline"}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.LoginButton}
            onPress={loginHandler}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    padding: 20,
  },
  logo: {
    width: 44,
    height: 44,
    top: 74,
    left: 21,
    position: "absolute",
  },
  inputPosition: {},
  logoText: {
    fontSize: 30,
    width: 24,
    height: 24,
  },
  title: {
    width: 68,
    height: 24,
    top: 84,
    left: 154,
    position: "absolute",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    position: "absolute",
    top: 30,
    left: 124,
    marginTop: 100,
  },
  greeting: {
    width: 95,
    height: 25,
    top: 278,
    left: 20,
    position: "absolute",
  },
  greetingText: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 25,
    letterSpacing: 0,
    textAlign: "left",
  },
  subtitle: {
    width: 224,
    height: 35,
    top: 261,
    left: 21,
    position: "absolute",
  },
  subtitleText: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 35,
    letterSpacing: 0,
    textAlign: "left",
    top: 50,
  },
  formLayout: {
    width: 335,
    top: 396,
    left: 12,
    position: "absolute",
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
    position: "relative",
    marginLeft: -15,
  },
  fullNameInput: {
    width: 335,
    height: 61,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
    top: 0,
    left: 0,
    borderColor: "#EAEBEC",
  },
  emailInput: {
    width: 335,
    height: 61,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
    left: 0,
    borderColor: "#EAEBEC",
  },
  passwordInput: {
    width: 335,
    height: 61,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
    top: 0,
    left: 0,
    position: "relative",
    borderColor: "#EAEBEC",
  },
  input: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    paddingLeft: 15,
    backgroundColor: "#FFFFFF",
  },
  showPasswordButton: {
    position: "absolute",
    top: 20,
    right: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    position: "absolute",
  },
  LoginButton: {
    width: 327,
    height: 52,
    padding: 20,
    paddingLeft: 84,
    paddingRight: 84,
    borderRadius: 30,
    backgroundColor: "#FF6464",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 130,
  },
});

export default Login;
