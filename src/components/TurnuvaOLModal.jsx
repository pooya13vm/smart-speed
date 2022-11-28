import React, { useState, useEffect } from "react";
import { Input } from "@rneui/base";
import uuid from "react-native-uuid";
import styled from "styled-components";
import { Alert } from "react-native";

//components
import ScreenLayout from "./ScreenLayout";
import CircleButton from "./CircleButton";
import { COLORS } from "../tools/colors";
import DropdownComponent from "./Dropdown";
import MultiSelectComponent from "./MultiSelectDD";
import { Modal } from "react-native";

//styled components
const Container = styled.View`
  width: 100%;
  justify-content: space-between;
  height: 75%;
  align-items: center;
`;
const InputContainer = styled.View`
  width: 90%;
  margin-top: 20px;
`;
const DropdownContainer = styled.View`
  padding-horizontal: 10px;
`;

const TurnuvaOLModal = ({
  parkur,
  persons,
  setRace,
  TUmodalVisible,
  setTUmodalVisible,
  navigation,
  sendBoxValue,
  id,
}) => {
  //states
  const [turnuvaName, setTurnuvaName] = useState("");
  const [selectedParkur, setSelectedParkur] = useState("");
  const [selectedPerson, setSelectedPerson] = useState([]);
  const [parkurDData, SetParkurDData] = useState([]);
  const [personsData, setPersonsData] = useState([]);
  //context

  useEffect(() => {
    if (parkur.length > 0) {
      let data = [];
      for (let i = 0; i < parkur.length; i++) {
        let item = { label: parkur[i].name, value: parkur[i].name };
        data = [...data, item];
      }
      SetParkurDData(data);
    }
    if (persons.length > 0) {
      let data = [];
      for (let i = 0; i < persons.length; i++) {
        let item = { label: persons[i].name, value: persons[i].name };
        data = [...data, item];
      }
      setPersonsData(data);
    }
  }, [parkur, persons]);

  //handlers
  const newRaceHandler = () => {
    if (
      turnuvaName === "" ||
      selectedParkur === "" ||
      selectedPerson.length == 0
    ) {
      Alert.alert("uyarı", "Lütfen Formdaki Tüm Girdileri Doldurun.");
    } else {
      let now = new Date();
      const myParkur = parkur.filter((item) => item.name === selectedParkur);

      let newRace = {
        id: uuid.v4(),
        date: now.toString().slice(4, 21),
        name: turnuvaName,
        parkurName: selectedParkur,
        deviceNum: myParkur[0].number,
        persons: selectedPerson,
        passingTime: [],
      };
      setRace(newRace);
      sendBoxValue(
        sendingMessageMaker(myParkur[0].number, myParkur[0].tip),
        id
      );

      setTUmodalVisible(false);
      navigation.navigate("TurnuvaList");
    }
  };
  const sendingMessageMaker = (deviceNumber, tip) => {
    if (deviceNumber == 2 && tip === "Renkli") return "B";
    if (deviceNumber == 2 && tip === "Tek Renk") return "A";
    if (deviceNumber == 3 && tip === "Tek Renk") return "D";
    if (deviceNumber == 3 && tip === "Renkli") return "E";
    if (deviceNumber == 4 && tip === "Tek Renk") return "F";
    if (deviceNumber == 4 && tip === "Renkli") return "G";
    if (deviceNumber == 5 && tip === "Tek Renk") return "H";
    if (deviceNumber == 5 && tip === "Renkli") return "I";
    if (deviceNumber == 6 && tip === "Tek Renk") return "J";
    if (deviceNumber == 6 && tip === "Renkli") return "K";
    if (deviceNumber == 7 && tip === "Tek Renk") return "L";
    if (deviceNumber == 7 && tip === "Renkli") return "M";
    if (deviceNumber == 8 && tip === "Tek Renk") return "N";
    if (deviceNumber == 8 && tip === "Renkli") return "O";
    if (deviceNumber == 9 && tip === "Tek Renk") return "P";
    if (deviceNumber == 9 && tip === "Renkli") return "R";
    if (deviceNumber == 10 && tip === "Tek Renk") return "S";
    if (deviceNumber == 10 && tip === "Renkli") return "T";
    if (deviceNumber == 11 && tip === "Tek Renk") return "U";
    if (deviceNumber == 11 && tip === "Renkli") return "V";
    if (deviceNumber == 12 && tip === "Tek Renk") return "Y";
    if (deviceNumber == 12 && tip === "Renkli") return "X";
  };

  return (
    <Modal animationType="slide" transparent={true} visible={TUmodalVisible}>
      <ScreenLayout
        title="Turnuva Oluştur"
        navigationFunction={() => setTUmodalVisible(false)}
      >
        <Container>
          <InputContainer>
            <Input
              value={turnuvaName}
              label="Turnuva Adı : *"
              style={{
                backgroundColor: "transparent",
                borderColor: COLORS.darkBlue,
                borderWidth: 1,
                width: "100%",
                borderRadius: 10,
                paddingHorizontal: 16,
              }}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              inputStyle={{
                color: COLORS.darkGreen,
              }}
              containerStyle={{ height: 90 }}
              labelStyle={{
                marginBottom: 10,
                color: COLORS.darkBlue,
                marginLeft: 5,
              }}
              onChangeText={(val) => setTurnuvaName(val)}
            />
            <DropdownContainer>
              <DropdownComponent
                data={parkurDData}
                onChangeSet={setSelectedParkur}
                placeholder="Parkur Seç"
              />
              <MultiSelectComponent
                data2={personsData}
                selectedItems={setSelectedPerson}
                placeholder="Katilimcilar Seç"
              />
            </DropdownContainer>
          </InputContainer>
          <CircleButton
            title="Kaydet"
            onPressFunction={() => {
              newRaceHandler();
            }}
          />
        </Container>
      </ScreenLayout>
    </Modal>
  );
};

export default TurnuvaOLModal;
