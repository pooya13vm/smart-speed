import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

//components
import ScreenLayout from "../components/ScreenLayout";

const AdvertisingContainer = styled.View`
  width: 80%;
  background-color: #d3d3d3;
  height: 200px;
  border-radius: 15px;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const AdvertiseText = styled.Text`
  font-size: 22px;
  text-align: center;
`;
const ButtonsContainer = styled.View`
  width: 80%;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10%;
  padding-top: 30px;
  height: 50%;
`;
const Button = styled.TouchableOpacity`
  width: 130px;
  height: 55px;
  background-color: #c93838;
  justify-content: center;
  align-items: center;
  margin: 15px auto;
  border-radius: 15px;
`;
const ButtonText = styled.Text`
  color: #fefefe;
  font-size: 16px;
`;

const Home = () => {
  return (
    <ScreenLayout title={"Smart Speed"}>
      <AdvertisingContainer>
        <AdvertiseText>Doner reklam alani Link verecek</AdvertiseText>
      </AdvertisingContainer>
      <ButtonsContainer>
        <Button>
          <ButtonText>Parkur Olustur</ButtonText>
        </Button>
        <Button>
          <ButtonText>Turnuva Olustur</ButtonText>
        </Button>
        <Button>
          <ButtonText>katilimci Listesi</ButtonText>
        </Button>
        <Button>
          <ButtonText>Turnuva Baslat</ButtonText>
        </Button>
        <Button>
          <ButtonText>Gecmis Turnuvalar</ButtonText>
        </Button>
        <Button>
          <ButtonText>Sarj Kontrol</ButtonText>
        </Button>
      </ButtonsContainer>
    </ScreenLayout>
  );
};

export default Home;
