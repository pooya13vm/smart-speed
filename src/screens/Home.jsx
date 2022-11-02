import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "../context/context";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity, StyleSheet } from "react-native";

//components

import ScreenLayout from "../components/ScreenLayout";
import { COLORS } from "../tools/colors";

const ButtonsContainer = styled.View`
  width: 80%;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  padding-vertical: 10%;
`;
const Button = styled.TouchableOpacity`
  shadow-color: ${COLORS.lightBlue};
  shadow-offset: 0px 10px;
  shadow-opacity: 0.23;
  shadow-radius: 11.27px;
  elevation: 14;
  width: 120px;
  height: 120px;
  justify-content: center;
  background-color: #fefefe;
  ${"" /* border-width: 1px; */}
  align-items: center;
  margin: 15px auto;
  border-radius: 15px;
  padding: 10px;
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
  }, []);
  return (
    <ScreenLayout>
      <ButtonsContainer>
        <Button onPress={() => navigation.navigate("Parkur")}>
          <Icon name="road" size={24} color={COLORS.darkGreen} />
          <ButtonText>Parkur Oluştur</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate("Katilimci")}>
          <Icon name="users" size={24} color={COLORS.darkGreen} />
          <ButtonText>Katılımcı Yönetimi</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate("Gecmis")}>
          <Icon name="history" size={24} color={COLORS.darkGreen} />
          <ButtonText>Geçmiş Turnuvalar</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate("TurnuvaBA")}>
          <Icon name="flag-checkered" size={24} color={COLORS.darkGreen} />
          <ButtonText>Turnuva Başlat</ButtonText>
        </Button>

        <Button onPress={() => navigation.navigate("Sarj")}>
          <Icon name="battery" size={24} color={COLORS.darkGreen} />
          <ButtonText>şarj kontrol</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate("Sarj")}>
          <Icon name="bluetooth-b" size={24} color={COLORS.darkGreen} />
          <ButtonText>Bağlamak</ButtonText>
        </Button>
      </ButtonsContainer>
    </ScreenLayout>
  );
};

// const styles = StyleSheet.create({
//   button: {
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 7,
//     },
//     shadowOpacity: 0.43,
//     shadowRadius: 9.51,
//     elevation: 15,
//     width: 120,
//     height: 120,
//     justifyContent: "center",
//     // backgroundColor: "transparent",
//     borderWidth: 1,
//     alignItems: "center",
//     margin: 15,
//     borderRadius: 15,
//     padding: 10,
//   },
// });

export default Home;
