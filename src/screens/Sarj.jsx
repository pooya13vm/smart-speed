import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome";
import uuid from "react-native-uuid";
import Lottie from "lottie-react-native";
import { AppContext } from "../context/context";

// personal components
import ScreenLayout from "../components/ScreenLayout";
import { COLORS } from "../tools/colors";

const ItemContainer = styled.View`
  flex-direction: row;
  width: 100%;
  padding-horizontal: 10px;
  margin-top: 10px;
  align-self: center;
  justify-content: space-around;
`;
const ItemText = styled.Text`
  font-size: 16px;
  color: ${COLORS.darkBlue};
`;
const AnimationContainer = styled.View`
  margin-top: 25%;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
`;

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
  if (percentage >= 85 && percentage <= 100) {
    return "battery-4";
  }
};

const Sarj = ({ navigation }) => {
  //states
  const [isData, SetIsData] = useState(false);
  const [list, setList] = useState([]);
  const [chargeData, setChargeData] = useState([]);

  //context
  const { chargeMessage } = useContext(AppContext);

  useEffect(() => {
    //making charge data array
    if (chargeMessage.includes(":")) {
      let index = chargeMessage.indexOf(":");
      let name = chargeMessage.slice(0, index);
      let charge = chargeMessage.slice(index + 1, chargeMessage.length + 1);
      if (chargeData.map((e) => e.device).indexOf(name) === -1) {
        let myObj = {
          device: name,
          charge: charge,
        };
        setChargeData([...chargeData, myObj]);
      } else {
        let index = chargeData.map((e) => e.device).indexOf(name);
        let copyOfState = [...chargeData];
        copyOfState[index].charge = charge;
        setChargeData(copyOfState);
      }
    }
  }, [chargeMessage]);

  useEffect(() => {
    if (chargeData.length > 0) {
      const setItem = async () => {
        const devicesArray = [];
        for (let i = 0; i < chargeData.length; i++) {
          let device = {
            name: chargeData[i].device,
            percentage: Number(chargeData[i].charge),
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
            <ItemContainer>
              {/* <ItemText>{index + 1}</ItemText> */}
              <ItemText>{item.name}</ItemText>
              {item.percentage != 0 ? (
                <>
                  <Icon
                    name={batteryName(item.percentage)}
                    size={16}
                    color={COLORS.darkBlue}
                  />
                  <ItemText>{`${item.percentage} %`}</ItemText>
                </>
              ) : (
                <ItemText>Cihaz Kapalı</ItemText>
              )}
            </ItemContainer>
          )}
        />
      ) : (
        <AnimationContainer>
          <Lottie
            style={{ flex: 1 }}
            source={require("../assets/images/98788-loading.json")}
            autoPlay
            loop
          />
        </AnimationContainer>
      )}
    </ScreenLayout>
  );
};

export default Sarj;
