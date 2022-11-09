import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from "../tools/colors";
import BackGround from "./BackGround";
import Icon from "react-native-vector-icons/FontAwesome";

const ScreenLayout = ({ children, title, navigationFunction }) => {
  return (
    <BackGround>
      {title && (
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 20,
            top: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: 60,
          }}
          onPress={navigationFunction}
        >
          <Icon name="angle-left" color="#fefefe" size={22} />
          <Text style={{ color: "#fefefe", fontSize: 18 }}>Geri</Text>
        </TouchableOpacity>
      )}

      <LinearGradient
        colors={["#fefefe", "#D7D7D6"]}
        style={{
          // backgroundColor: "#D7D7D6",
          height: "82%",
          width: "90%",
          alignSelf: "center",
          marginTop: "25%",
          borderRadius: 30,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/Screen_Shot_2022-10-27_at_13.56.36-removebg.png")}
          style={{
            width: 150,
            height: 150,
            marginTop: -60,
            backgroundColor: "#fefefe",
            borderRadius: 100,
          }}
        />
        {title && (
          <Text
            style={{ fontSize: 24, fontWeight: "bold", color: COLORS.darkBlue }}
          >
            {title}
          </Text>
        )}

        {children}
      </LinearGradient>
    </BackGround>
  );
};

export default ScreenLayout;
