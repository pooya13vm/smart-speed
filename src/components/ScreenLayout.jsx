import React from "react";
import { Image, Text, TouchableOpacity, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from "../tools/colors";
import BackGround from "./BackGround";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ScreenLayout = ({ children, title, navigationFunction }) => {
  return (
    <BackGround>
      {title ? (
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
          <Icon name="chevron-left" color="#fefefe" size={30} />
          <Text style={{ color: "#fefefe", fontSize: 18 }}>Geri</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 0,
            top: 25,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: 60,
          }}
          onPress={navigationFunction}
        >
          <Icon name="web" color="#fefefe" size={35} />
        </TouchableOpacity>
      )}

      <LinearGradient
        colors={["#fefefe", "#D7D7D6"]}
        style={{
          height: "82%",
          width: "90%",
          alignSelf: "center",
          marginTop: Platform.OS === "ios" ? "20%" : "25%",
          borderRadius: 30,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/Screen_Shot_2022-10-27_at_13.56.36-removebg.png")}
          style={{
            width: 150,
            height: 150,
            marginTop: Platform.OS === "ios" ? 10 : -60,
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
