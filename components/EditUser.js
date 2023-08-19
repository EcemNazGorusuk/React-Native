import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const EditUser = ({ navigation }) => {
  const [user_fullname, setUserFullName] = useState("");
  const [user_email, setUserEmail] = useState("");
  const [user_phone, setUserPhone] = useState("");

  // Apı'de user_password alanı zorunlu olduğu için ve
  //  Figma tasarımında user_password alanı olmadığı için default null değeri atandı.
  const [user_password, setUserPassword] = useState("null");
  const [user_status, setUserStatus] = useState("");


  const addHandler = async () => {
    try {
            // her bir kullanıcı girişnde verilen 
      // token apı'deki tüm işlemlerinde dönen response alanını null dönderdiği için 
      // dökümanda verilen örnek kullanıcının token'ı üzerinden tüm işlemleri yapmak zorunda kaldım
      const storedToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWEzNmY4N2MtMWY1Yy00NjY5LThmYzMtOGEwYWUyYzRiY2E2IiwidXNlcl9mdWxsbmFtZSI6IsSwaHNhbiBLIiwidXNlcl90eXBlIjpudWxsLCJ1c2VyX3N0YXR1cyI6IkFjdGl2ZSIsInVzZXJfZW1haWwiOiJraXlpY2kzNUBnbWFpbC5jb20iLCJpYXQiOjE2OTIzOTY2ODN9.QOU959W-MQktQynjKjPACurkcn-9DnhMnnNvFMWgWkM";

      console.log("bilgilerim",user_fullname,user_email,user_phone,user_password)
      const response = await axios.post(
        "http://116.203.196.162:3000/users/new",
        {
          user_fullname,
          user_phone,
          user_email,
          user_password,
          user_status
        },
        {   headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.data.errorCode === null) {
        console.log("User added successfully:", response.data.response);

        if (route.params.onUserUpdated) {
          route.params.onUserUpdated();
        }
        if (route.params.onUserFullNameUpdated) {
          route.params.onUserFullNameUpdated();
        }
        if (route.params.onUserEmailUpdated) {
          route.params.onUserEmailUpdated();
        }
  
      } else {
        console.error("Error adding user:", response.data.errorCode);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.editUserText}>Edit User</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/Group3481.png")} // Kullanılacak resmin yolunu güncelleyin
          style={styles.userImage}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={user_fullname}
        onChangeText={(text) => setUserFullName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={user_phone}
        onChangeText={(text) => setUserPhone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={user_email}
        onChangeText={(text) => setUserEmail(text)}
      />
       <TextInput
        style={styles.input}
        placeholder="Status"
        value={user_status}
        onChangeText={(text) => setUserStatus(text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={addHandler}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  backButton: {
    position: "absolute",
    top: 85,
    left: 20,
  },
  editUserText: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: "500",
  },
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 45,
  },
  userImage: {
    width: 80,
    height: 80,
  },
  input: {
    width: 335,
    height: 61,
    borderColor: "#C4C4C4",
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    width: 335,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#42CD00",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditUser;
