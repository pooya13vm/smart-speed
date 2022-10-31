import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import DropdownComponent from "../components/Dropdown";
import ScreenLayout from "../components/ScreenLayout";
import { COLORS } from "../tools/colors";

const data = [
  { label: "Yol turnuvs", value: "Yol turnuvs" },
  { label: "Item 2", value: "2" },
];

const Gecmis = () => {
  return (
    <ScreenLayout title="Geçmiş Turnuvalar">
      <View
        style={{
          width: "90%",
          marginTop: 30,
        }}
      >
        <DropdownComponent
          placeholder="Turnuva Sec"
          data={data}
          onChangeSet={() => console.log("hi")}
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
            alignSelf: "center",
            borderColor: COLORS.darkBlue,
            borderWidth: 2,
            width: 100,
            height: 100,
            justifyContent: "center",
            marginTop: "95%",
            borderRadius: 100,
            padding: 5,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={{ fontSize: 20, color: COLORS.darkBlue, fontWeight: "bold" }}
          >
            Gösteri
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

export default Gecmis;
