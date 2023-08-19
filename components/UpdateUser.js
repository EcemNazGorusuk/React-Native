import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Picker,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const UpdateUser = ({ navigation, route }) => {
  const { user } = route.params;
  const [user_fullname, setUserFullName] = useState("");
  const [user_email, setUserEmail] = useState("");
  const [user_phone, setUserPhone] = useState("");
  const [user_id, setUserId] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [user_status, setUserStatus] = useState("");

  useEffect(() => {
    setUserFullName(user.user_fullname);
    setUserPhone(user.user_phone);
    setUserEmail(user.user_email);
    setUserId(user.user_id);
    setUserStatus(user.user_status);
  }, [user]);

  const deleteHandler = async () => {
    try {
      // her bir kullanıcı girişnde verilen 
      // token apı'deki tüm işlemlerinde dönen response alanını null dönderdiği için 
      // dökümanda verilen örnek kullanıcının token'ı üzerinden tüm işlemleri yapmak zorunda kaldım
      const storedToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWEzNmY4N2MtMWY1Yy00NjY5LThmYzMtOGEwYWUyYzRiY2E2IiwidXNlcl9mdWxsbmFtZSI6IsSwaHNhbiBLIiwidXNlcl90eXBlIjpudWxsLCJ1c2VyX3N0YXR1cyI6IkFjdGl2ZSIsInVzZXJfZW1haWwiOiJraXlpY2kzNUBnbWFpbC5jb20iLCJpYXQiOjE2OTIzOTY2ODN9.QOU959W-MQktQynjKjPACurkcn-9DnhMnnNvFMWgWkM";

      console.log("ıd", user_id);
      const response = await axios.delete(
        `http://116.203.196.162:3000/users/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      console.log("User deleted:", response.data);

      if (route.params.onUserUpdated) {
        route.params.onUserUpdated();
      }
      if (route.params.onUserFullNameUpdated) {
        route.params.onUserFullNameUpdated();
      }
      if (route.params.onUserEmailUpdated) {
        route.params.onUserEmailUpdated();
      }

      setIsUpdated(true);

    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const showDeleteAlert = () => {
    Alert.alert("Delete User", "Are you sure you want to delete this user?", [
      {
        text: "CANCEL",
        style: "cancel",
      },
      {
        text: "OKEY",
        onPress: () => deleteHandler(),
      },
    ]);
  };

  const updateHandler = async () => {
    try {
      const storedToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWEzNmY4N2MtMWY1Yy00NjY5LThmYzMtOGEwYWUyYzRiY2E2IiwidXNlcl9mdWxsbmFtZSI6IsSwaHNhbiBLIiwidXNlcl90eXBlIjpudWxsLCJ1c2VyX3N0YXR1cyI6IkFjdGl2ZSIsInVzZXJfZW1haWwiOiJraXlpY2kzNUBnbWFpbC5jb20iLCJpYXQiOjE2OTIzOTY2ODN9.QOU959W-MQktQynjKjPACurkcn-9DnhMnnNvFMWgWkM";

      console.log("ıd", user_id);

      console.log("bilgilerim", user_fullname, user_phone);
      const response = await axios.put(
        "http://116.203.196.162:3000/users",
        {
          user_id,
          user_fullname,
          user_phone,
          user_email,
          user_status,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      console.log("User update:", response.data);
     setIsUpdated(true);

      if (route.params.onUserUpdated) {
        route.params.onUserUpdated();
      }
      if (route.params.onUserFullNameUpdated) {
        route.params.onUserFullNameUpdated();
      }
      if (route.params.onUserEmailUpdated) {
        route.params.onUserEmailUpdated();
      }
    } catch (error) {
      console.error("Error update user:", error);
    }
  };

  useEffect(() => {
    if (isUpdated) {
      Alert.alert("Updated!", "Update Successfully", [
        {
          text: "OKEY",
          onPress: () => setIsUpdated(false),
          style: "default", 
        },
      ]);
    }
  }, [isUpdated]);

  // const statusOptions = [
  //   { label: "Active", value: "Active" },
  //   { label: "Passive", value: "Passive" },
  // ];

  //   setUserStatus(user.user_status);
  console.log("kontrol", user_fullname, user_email, user_phone);
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Ionicons name="arrow-back" size={24} color="black" />
//       </TouchableOpacity>
//       <Text style={styles.editUserText}>Edit User</Text>
//       <View style={styles.imageContainer}>
//         <Image
//           source={require("../assets/Group3481.png")} // Kullanılacak resmin yolunu güncelleyin
//           style={styles.userImage}
//         />
//       </View>
//       <TextInput
//         style={styles.input}
//         placeholder="Full Name"
//         value={user_fullname}
//         onChangeText={(text) => setUserFullName(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Phone Number"
//         value={user_phone}
//         onChangeText={(text) => setUserPhone(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="E-mail"
//         value={user_email}
//         onChangeText={(text) => setUserEmail(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Status"
//         value={user_status}
//         onChangeText={(text) => setUserStatus(text)}
//       />
   


//    {/* <View style={styles.input}>
//         <Text>Status</Text>
//         <Picker
//           selectedValue={user_status}
//           onValueChange={(itemValue) => setUserStatus(itemValue)}
//         >
//           <Picker.Item label="Active" value="Active" />
//           <Picker.Item label="Passive" value="Passive" />
//         </Picker>
//       </View> */}

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           onPress={updateHandler}
//           style={[styles.button, styles.addButton]}
//         >
//           <Text style={styles.buttonText}>Edit</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={showDeleteAlert}
//           style={[styles.button, styles.deleteButton]}
//         >
//           <Text style={styles.buttonText}>Delete User</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );


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
          source={require("../assets/Group3481.png")}
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
          onPress={updateHandler}
          style={[styles.button, styles.addButton]}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={showDeleteAlert}
          style={[styles.button, styles.deleteButton]}
        >
          <Text style={styles.buttonText}>Delete User</Text>
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
  deleteButton: {
    backgroundColor: "#FF6464",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  okeyButton: {
    width: 327,
    height: 52,
    top: 777,
    left: 24,
    padding: 20,
    paddingHorizontal: 84,
    borderRadius: 30,
    gap: 10,
    backgroundColor: "#FF6464",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UpdateUser;
