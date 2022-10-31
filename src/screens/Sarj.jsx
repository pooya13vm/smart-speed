import React from "react";
import ScreenLayout from "../components/ScreenLayout";
import { View, Text, FlatList } from "react-native";
import { COLORS } from "../tools/colors";
import Icon from "react-native-vector-icons/FontAwesome";

const data = [
  { name: "cihaz-1", percentage: 10 },
  { name: "cihaz-2", percentage: 60 },
  { name: "cihaz-3", percentage: 90 },
];
const batteryName = (percentage) => {
  if (percentage < 10) {
    return "battery-0";
  }
  if (percentage >= 10 && percentage < 25) {
    return "battery-1";
  }
  if (percentage >= 25 && percentage < 50) {
    return "battery-2";
  }
  if (percentage >= 50 && percentage < 85) {
    return "battery-3";
  }
  if (percentage >= 85 && percentage < 100) {
    return "battery-4";
  }
};

const Sarj = () => {
  return (
    <ScreenLayout title="şarj kontrol">
      <FlatList
        style={{
          marginBottom: 30,
          borderBottomWidth: 2,
          borderBottomColor: COLORS.darkBlue,
          width: "90%",
          marginTop: 30,
        }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingHorizontal: 10,
              marginTop: 10,
              alignSelf: "center",
              justifyContent: "space-around",
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.darkBlue }}>
              {index + 1}
            </Text>
            <Text style={{ fontSize: 16, color: COLORS.darkBlue }}>
              {item.name}
            </Text>
            <Icon
              name={batteryName(item.percentage)}
              size={16}
              color={COLORS.darkBlue}
            />
            <Text
              style={{ fontSize: 16, color: COLORS.darkBlue }}
            >{`${item.percentage} %`}</Text>
          </View>
        )}
      />
    </ScreenLayout>
  );
};

export default Sarj;
