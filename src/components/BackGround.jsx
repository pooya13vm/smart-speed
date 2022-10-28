import React from "react";
import { Dimensions, SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from "../tools/colors";

const { height, width } = Dimensions.get("window");

const BackGround = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0dbab1", COLORS.lightBlue]}
        style={{ height: height, width: width }}
      >
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default BackGround;
