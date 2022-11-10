import React, { useContext, useEffect, useState } from "react";
import ScreenLayout from "../components/ScreenLayout";
import { View, Text, FlatList } from "react-native";
import { COLORS } from "../tools/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import uuid from "react-native-uuid";
import { BluetoothContext } from "../context/bluetooth";

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

const Sarj = ({ navigation }) => {
  //context
  const { chargeData } = useContext(BluetoothContext);

  //states
  const [isData, SetIsData] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (chargeData.length > 0) {
      const setItem = async () => {
        const devicesArray = [];
        for (let i = 0; i < chargeData.length; i++) {
          let index = chargeData[i].indexOf(":");
          let name = chargeData[i].slice(0, index);
          let charge = chargeData[i].slice(index + 1, chargeData[i].length);
          let device = {
            name: name,
            percentage: Number(charge),
            id: uuid.v4(),
          };
          devicesArray.push(device);
        }
        return devicesArray;
      };
      setList(setItem()._3);
      SetIsData(true);
    }
  }, [chargeData]);

  return (
    <ScreenLayout
      title="şarj kontrol"
      navigationFunction={() => navigation.goBack()}
    >
      {isData ? (
        <FlatList
          style={{
            marginBottom: 30,
            borderBottomWidth: 2,
            borderBottomColor: COLORS.darkBlue,
            width: "90%",
            marginTop: 30,
          }}
          data={list}
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
      ) : (
        <View
          style={{
            marginTop: "25%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.darkBlue }}>
            Lütfen önce Bluetooth bağlantısını kurun
          </Text>
        </View>
      )}
    </ScreenLayout>
  );
};

export default Sarj;
