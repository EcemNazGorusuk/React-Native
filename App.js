import React, { useEffect } from "react";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Image, StyleSheet } from "react-native";
import Home from "./screens/Home";
import SignUp from "./screens/Signup";
import Login from "./screens/Login";
import Applicants from "./screens/Applicants";
import { StatusBar } from "expo-status-bar";
import IconButton from "./UI/IconButton";
import EditUser from "./components/EditUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UpdateUser from "./components/UpdateUser";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    const logout = async () => {
      try {
        await AsyncStorage.removeItem("token");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        );
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    logout();
  }, []);

  return null;
};

const ApplicantsTab = () => {
  return (
    <Tab.Navigator screenOptions={{}}>
      <Tab.Screen
        name="Users"
        component={Applicants}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: () => (
            <Ionicons name="person-circle" size={38} color={"#ff6464"} />
          ),
        }}
      />
      <Tab.Screen
        name="EditUser"
        component={EditUser}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <IconButton
              iconName="add"
              iconSize={60}
              iconColor={"#ff6464"}
              iconStyle={styles.circle}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        options={({ navigation }) => ({
          tabBarLabel: "Logout",
          tabBarLabelStyle: { color: "#ff6464" },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("./assets/logout.png")}
              style={{ width: 20, height: 20 }}
            />
          ),
          tabBarPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Home" }],
              })
            );
          },
        })}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Applicants"
            component={ApplicantsTab}
            options={{
              headerShown: false,
            }}
          />
           <Stack.Screen
            name="UpdateUser"
            component={UpdateUser}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 71,
    height: 65,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  halfCircle: {
    position: "absolute",
    left: 50,
    top: 10,
    backgroundColor: "#ff6464",
    width: 17,
    height: 25,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
  },
});

export default App;
