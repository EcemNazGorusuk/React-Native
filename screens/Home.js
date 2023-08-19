import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        navigation.navigate("Applicants");
      }
    };

    checkTokenAndNavigate();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/Group145.png")} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.box}>
          <Text style={styles.title}>
            Korem ipsum dolor sit amet consectetur
          </Text>
          <Text style={styles.text}>
            Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: 395,
    height: 610,
    right: -2,
    position: "absolute",
    top: 0,
  },
  box: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: 395,
    height: 1300,
    top: 396,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    background: "#F6F6F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign:"center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign:"center",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center", // Değiştirildi
    marginTop: 10,
  },
  loginButton: {
    width: 327,
    height: 52,
    padding: 20,
    paddingLeft: 84,
    paddingRight: 84,
    borderRadius: 30,
    backgroundColor: "#FF6464",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  signUpButton: {
    width: 327,
    height: 52,
    padding: 20,
    paddingLeft: 84,
    paddingRight: 84,
    borderRadius: 30,
    backgroundColor: "#74C6F7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    position: "absolute",
  },
  content: {
    position: "absolute",
    top: 50,
  },
});

export default Home;
