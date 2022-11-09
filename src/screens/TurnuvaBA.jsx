import React, { useState, useContext, useEffect } from "react";
import { Alert } from "react-native";
import { Input } from "@rneui/base";
import uuid from "react-native-uuid";
import styled from "styled-components";

//components
import ScreenLayout from "../components/ScreenLayout";
import { AppContext } from "../context/context";
import CircleButton from "../components/CircleButton";
import { COLORS } from "../tools/colors";
import DropdownComponent from "../components/Dropdown";
import MultiSelectComponent from "../components/MultiSelectDD";

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

const TurnuvaBA = ({ navigation }) => {
  //states
  const [turnuvaName, setTurnuvaName] = useState("");
  const [selectedParkur, setSelectedParkur] = useState("");
  const [selectedPerson, setSelectedPerson] = useState([]);
  const [parkurDData, SetParkurDData] = useState([]);
  const [personsData, setPersonsData] = useState([]);
  //context
  const { parkur, persons, setRace } = useContext(AppContext);

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
    // if (isConnected) {
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
      navigation.navigate("TurnuvaList");
    }
    // } else {
    //   Alert.alert("uyarı", "Lütfen önce Bluetooth bağlantısını kurun.");
    // }
  };

  return (
    <ScreenLayout
      title="Turnuva Oluştur"
      navigationFunction={() => navigation.goBack()}
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
          title="Başlat"
          onPressFunction={() => {
            newRaceHandler();
          }}
        />
      </Container>
    </ScreenLayout>
  );
};

export default TurnuvaBA;
