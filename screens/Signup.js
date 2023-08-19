import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const SignUp = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);


  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [user_fullname, setName] = useState("");

  const signupHandler = async () => {
    console.log("deneme");
     try {
      
         const response = await axios.post(
           "http://116.203.196.162:3000/users", 
           {
            user_fullname,
            user_email,
            user_password
           }
         );

         console.log("Register Success:", response.data);   
         // console.log("Token:", token); // Token'ı konsolda göster
         navigation.navigate("Login");
       } catch (error) {
         console.error("Login Error:", error);
       }
 
   };



  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logo} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" style={styles.logoText}></Ionicons>
      </TouchableOpacity>
      <View style={styles.title}>
        <Text style={styles.titleText}>Sign Up</Text>
      </View>
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Hello There 🖐</Text>
      </View>
      <View style={styles.subtitle}>
        <Text style={styles.subtitleText}>Create an account</Text>
      </View>
      <View style={styles.formLayout}>
        <View style={[styles.inputContainer, styles.fullNameInput]}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#999"
            value={user_fullname} 
            onChangeText={(text) => setName(text)} 
          />
        </View>
        <View style={[styles.inputContainer, styles.emailInput]}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={user_email} 
            onChangeText={(text) => setEmail(text)} 
          />
        </View>
        <View style={[styles.inputContainer, styles.passwordInput]}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={user_password} 
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
            style={styles.signUpButton}
            onPress={signupHandler}
          >
            <Text style={styles.buttonText}>Sign up</Text>
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
  greeting: {
    width: 95,
    height: 25,
    top: 228,
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
   
    fontSize: 25,
    fontWeight: "700",
    lineHeight: 35,
    letterSpacing: 0,
    textAlign: "left",
  },
  formLayout: {
    width: 335,
    top: 356,
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
    borderColor:"#EAEBEC",
  },
  emailInput: {
    width: 335,
    height: 61,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
    top: 0,
    left: 0,
    borderColor:"#EAEBEC",
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
    borderColor:"#EAEBEC",
  },
  input: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    paddingLeft: 15,
    backgroundColor :"#FFFFFF"

  },
  showPasswordButton: {
    position: "absolute",
    top: 20,
    right: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    textAlign: "center", // Added for center alignment
  },
  signUpButton: {
    width: 327,
    height: 52,
    padding: 20,
    paddingLeft: 84,
    paddingRight: 84,
    borderRadius: 30,
    backgroundColor: "#FF6464",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 90, // Adding gap between buttons
  },
});

export default SignUp;
