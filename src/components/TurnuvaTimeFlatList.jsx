import React from "react";
import { FlatList, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Lottie from "lottie-react-native";
import { displayTime } from "../tools/displayTime";
import { COLORS } from "../tools/colors";

const TurnuvaTimeFlatList = ({ devices, num }) => {
  if (devices.length > 0) {
    return (
      <>
        <FlatList
          style={{
            marginBottom: 30,
            borderBottomWidth: 2,
            borderBottomColor: COLORS.darkBlue,
            width: "90%",
            paddingTop: 30,
            paddingBottom: 10,
            borderBottomWidth: 0,
          }}
          contentContainerStyle={{
            alignItems: "center",
            width: "90%",
            alignSelf: "center",
            position: "relative",
          }}
          data={devices}
          keyExtractor={(item) => item.index}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: "50%",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
                marginVertical: 10,
              }}
            >
              {displayTime(item) === "00:00:00" ? (
                <>
                  <Icon name="traffic-cone" color={COLORS.darkBlue} size={20} />
                  <Text style={{ fontSize: 20, color: COLORS.darkBlue }}>
                    {displayTime(item)}
                  </Text>
                </>
              ) : (
                <>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      alignItems: "center",
                    }}
                  >
                    <Lottie
                      style={{ flex: 1 }}
                      source={require("../assets/images/94242-flag-with-sparkle.json")}
                      autoPlay
                      loop={false}
                    />
                  </View>
                  <Text style={{ fontSize: 18 }}>{displayTime(item)}</Text>
                </>
              )}
            </View>
          )}
        />
      </>
    );
  }
};

export default TurnuvaTimeFlatList;
