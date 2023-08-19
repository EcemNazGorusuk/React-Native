import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Applicants = () => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(null);
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          console.log("My token is:", storedToken);
          setIsLoggedIn(true); // Kullanıcı giriş yaptığında durumu güncelle
        } else {
          console.log("Token not found");
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };
    getToken();
    fetchUsers();
    getUserFullName();
    getUserEmail();
  }, []);

  const fetchUsers = async () => {
    try {
            // her bir kullanıcı girişnde verilen 
      // token apı'deki tüm işlemlerinde dönen response alanını null dönderdiği için 
      // dökümanda verilen örnek kullanıcının token'ı üzerinden tüm işlemleri yapmak zorunda kaldım
      const storedToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWEzNmY4N2MtMWY1Yy00NjY5LThmYzMtOGEwYWUyYzRiY2E2IiwidXNlcl9mdWxsbmFtZSI6IsSwaHNhbiBLIiwidXNlcl90eXBlIjpudWxsLCJ1c2VyX3N0YXR1cyI6IkFjdGl2ZSIsInVzZXJfZW1haWwiOiJraXlpY2kzNUBnbWFpbC5jb20iLCJpYXQiOjE2OTIzOTY2ODN9.QOU959W-MQktQynjKjPACurkcn-9DnhMnnNvFMWgWkM";

      const response = await axios.get("http://116.203.196.162:3000/users", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.data.errorCode === null) {
        console.log("response", response.data);
        setUsers(response.data.response);
        console.log("usersss", response.data.response);
        console.log("User Success:", response.data);
      } else {
        console.error("Error fetching users:", response.data.errorCode);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getUserFullName = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user_fullname");
      if (storedUser) {
        setUserFullName(storedUser);
      }
    } catch (error) {
      console.error("Error retrieving user fullname:", error);
    }
  };

  const getUserEmail = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      if (storedEmail) {
        setUserEmail(storedEmail);
      }
    } catch (error) {
      console.error("Error retrieving user email:", error);
    }
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity
      style={styles.userContainer}
   onPress={() =>
        navigation.navigate("UpdateUser", {
        user: item,
        onUserUpdated: fetchUsers,
        onUserFullNameUpdated: getUserFullName, 
        onUserEmailUpdated: getUserEmail,
        })
      }
    >


      <View style={styles.circle}>
        <Image
          source={require("../assets/Group3480.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.userName}>{item.user_fullname}</Text>
      <View
        style={[
          styles.activeContainer,
          {
            backgroundColor:
              item.user_status === "Active" ? "#d2fbd4" : "#fbd2d2",
          },
        ]}
      >
        <Text
          style={[
            styles.activeText,
            {
              color: item.user_status === "Active" ? "#4ec353" : "#FF6464",
            },
          ]}
        >
          {item.user_status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.editText}>Users</Text>
      {isLoggedIn ? (
        <View>
          {/* <Text>Welcome, {userFullName}</Text>
          <Text>Email: {userEmail}</Text> */}
        </View>
      ) : (
        <Text>Please log in to see the user list.</Text>
      )}
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.user_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
  },
  editText: {
    fontSize: 24,
    marginTop: 80,
    fontWeight: "500",
    bottom: 30,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 17,
    padding: 10,
    backgroundColor: "white",
    width: 360,
    position: "relative",
  },
  userName: {
    marginLeft: 20,
    fontSize: 18,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#dfdfdf",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#dfdfdf",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#dfdfdf",
    backgroundColor: "#dfdfdf",
    top: 5,
  },
  activeContainer: {
    backgroundColor: "#d2fbd4",
    padding: 10,
    borderRadius: 12,
    marginLeft: "auto",
    width: 70,
  },
  activeText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Applicants;
