import React from "react";
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

const Home = ({ navigation }) => {
  return (
    <ScreenLayout title={"Smart Speed"}>
      <AdvertisingContainer>
        <AdvertiseText>Doner reklam alani Link verecek</AdvertiseText>
      </AdvertisingContainer>
      <ButtonsContainer>
        <Button
          onPress={() =>
            navigation.navigate("Test", { title: "Parkur Olustur" })
          }
        >
          <ButtonText>Parkur Olustur</ButtonText>
        </Button>
        <Button
          onPress={() =>
            navigation.navigate("Test", { title: "Turnuva Olustur" })
          }
        >
          <ButtonText>Turnuva Olustur</ButtonText>
        </Button>
        <Button
          onPress={() =>
            navigation.navigate("Test", { title: "katilimci Listesi" })
          }
        >
          <ButtonText>katilimci Listesi</ButtonText>
        </Button>
        <Button
          onPress={() =>
            navigation.navigate("Test", { title: "Turnuva Baslat" })
          }
        >
          <ButtonText>Turnuva Baslat</ButtonText>
        </Button>
        <Button
          onPress={() =>
            navigation.navigate("Test", { title: "Gecmis Turnuvalar" })
          }
        >
          <ButtonText>Gecmis Turnuvalar</ButtonText>
        </Button>
        <Button
          onPress={() => navigation.navigate("Test", { title: "Sarj Kontrol" })}
        >
          <ButtonText>Sarj Kontrol</ButtonText>
        </Button>
      </ButtonsContainer>
    </ScreenLayout>
  );
};

export default Home;
