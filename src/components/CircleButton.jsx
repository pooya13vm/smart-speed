import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { COLORS } from "../tools/colors";

const CircleButton = ({ title, onPressFunction }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        borderColor: COLORS.darkBlue,
        borderWidth: 2,
        width: 100,
        height: 100,
        justifyContent: "center",
        borderRadius: 10,
        borderRadius: 100,
        padding: 5,
      }}
      onPress={() => onPressFunction(true)}
    >
      <Text
        style={{ fontSize: 20, color: COLORS.darkBlue, fontWeight: "bold" }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default CircleButton;
