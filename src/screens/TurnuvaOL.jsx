import React from "react";
import ScreenLayout from "../components/ScreenLayout";
import { View } from "react-native";
import { Input } from "@rneui/base";
import { COLORS } from "../tools/colors";

const TurnuvaOL = () => {
  const inputsStyle = {
    backgroundColor: "transparent",
    borderColor: COLORS.darkBlue,
    borderWidth: 1,
    width: "75%",
    borderRadius: 10,
    paddingHorizontal: 16,
  };
  return (
    <ScreenLayout title="Turnuva Oluştur">
      <View style={{ width: "90%", marginTop: 20 }}>
        <Input
          label="Turnuva Adı : *"
          style={inputsStyle}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          inputStyle={{
            color: COLORS.darkGreen,
          }}
          labelStyle={{ marginBottom: 10, color: COLORS.darkBlue }}
          // onChangeText={(val) => setAlias(val)}
        />
        <Input
          label="Turnuva Tarihi : *"
          style={inputsStyle}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          inputStyle={{
            color: COLORS.darkGreen,
          }}
          placeholder="dd/mm/year"
          labelStyle={{ marginBottom: 10, color: COLORS.darkBlue }}
          // onChangeText={(val) => setAlias(val)}
        />
        <Input
          label="Parkur Sec : *"
          style={inputsStyle}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          inputStyle={{
            color: COLORS.darkGreen,
          }}
          labelStyle={{ marginBottom: 10, color: COLORS.darkBlue }}
          // onChangeText={(val) => setAlias(val)}
        />
        <Input
          label="Katilimci Sec : *"
          style={inputsStyle}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          inputStyle={{
            color: COLORS.darkGreen,
          }}
          labelStyle={{ marginBottom: 10, color: COLORS.darkBlue }}
          // onChangeText={(val) => setAlias(val)}
        />
      </View>
    </ScreenLayout>
  );
};

export default TurnuvaOL;
