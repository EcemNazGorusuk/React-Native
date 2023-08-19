import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({iconName,iconSize,iconColor,iconStyle}) => {
  return (
    <View  style={iconStyle}>
      <Ionicons name={iconName} size={iconSize} color={iconColor}  />
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default IconButton;
