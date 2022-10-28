import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "../context/context";
import { BackHandler, Alert, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

//components

import ScreenLayout from "../components/ScreenLayout";
import { COLORS } from "../tools/colors";

const ButtonsContainer = styled.View`
  width: 80%;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  ${"" /* height: 50%; */}
`;
const Button = styled.TouchableOpacity`
  width: 120px;
  height: 120px;
  justify-content: center;
  background-color: transparent;
  border-width: 1px;
  align-items: center;
  margin: 15px auto;
  border-radius: 15px;
  padding: 10px;
  ${"" /* background-color: #e4e4dc; */}
`;
const ButtonText = styled.Text`
  color: ${COLORS.darkGreen};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const Home = ({ navigation }) => {
  const { contact, saveToStorage } = useContext(AppContext);

  useEffect(() => {
    saveToStorage(contact);
    // const backAction = () => {
    //   Alert.alert("Bekle!", "Çıkmak istediğine emin misin??", [
    //     {
    //       text: "Iptal",
    //       onPress: () => null,
    //       style: "cancel",
    //     },
    //     { text: "Evet", onPress: () => BackHandler.exitApp() },
    //   ]);
    //   return true;
    // };

    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   backAction
    // );

    // return () => backHandler.remove();
  }, []);
  return (
    <ScreenLayout>
      <ButtonsContainer>
        <Button onPress={() => navigation.navigate("Parkur")}>
          <Icon name="road" size={24} color={COLORS.darkGreen} />
          <ButtonText>Parkur Oluştur</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate("TurnuvaOL")}>
          <Icon name="tachometer" size={24} color={COLORS.darkGreen} />
          <ButtonText>Turnuva Oluştur</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate("Katilimci")}>
          <Icon name="list" size={24} color={COLORS.darkGreen} />
          <ButtonText>katilimci Listesi</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate("TurnuvaBA")}>
          <Icon name="flag-checkered" size={24} color={COLORS.darkGreen} />
          <ButtonText>Turnuva Başlat</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate("Gecmis")}>
          <Icon name="history" size={24} color={COLORS.darkGreen} />
          <ButtonText>Geçmiş Turnuvalar</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate("Sarj")}>
          <Icon name="battery" size={24} color={COLORS.darkGreen} />
          <ButtonText>şarj kontrol</ButtonText>
        </Button>
      </ButtonsContainer>
      <TouchableOpacity
        style={{
          alignItems: "center",
          borderColor: COLORS.darkBlue,
          borderWidth: 2,
          width: 100,
          height: 100,
          justifyContent: "center",
          borderRadius: 10,
          marginTop: 10,
          borderRadius: 100,
          padding: 5,
        }}
      >
        <Icon name="bluetooth-b" size={24} color={COLORS.darkGreen} />
        <ButtonText>Cihaza Bağlan</ButtonText>
      </TouchableOpacity>
    </ScreenLayout>
  );
};

export default Home;
