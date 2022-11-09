import React, { useState, useContext, useEffect } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { Input } from "@rneui/base";
import uuid from "react-native-uuid";

//components
import ScreenLayout from "../components/ScreenLayout";
import { AppContext } from "../context/context";
import CircleButton from "../components/CircleButton";
import { COLORS } from "../tools/colors";
import DropdownComponent from "../components/Dropdown";
import MultiSelectComponent from "../components/MultiSelectDD";

const TurnuvaBA = ({ navigation }) => {
  //states
  const [turnuvaName, setTurnuvaName] = useState("");
  const [selectedParkur, setSelectedParkur] = useState("");
  const [selectedPerson, setSelectedPerson] = useState([]);
  const [parkurDData, SetParkurDData] = useState([]);
  const [personsData, setPersonsData] = useState([]);
  //context
  const {
    parkur,
    persons,
    saveRace,
    setRace,
    isConnected,
    connectedDevice,
    race,
  } = useContext(AppContext);

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
      // setModalVisible(true);
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
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <Input
            value={turnuvaName}
            label="Turnuva Adı : *"
            style={styles.input}
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
          <View style={styles.DDContainer}>
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
          </View>
        </View>
        <CircleButton
          title="Başlat"
          onPressFunction={() => {
            newRaceHandler();
          }}
        />
      </View>
      {/* <TurnuvaModal
        modalVisible={modalVisible}
        saveRace={saveRace}
        selectedPerson={selectedPerson}
        setModalVisible={setModalVisible}
        setRace={setRace}
        turnuvaName={turnuvaName}
        connectedDevice={connectedDevice}
      /> */}
    </ScreenLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    height: "75%",
    alignItems: "center",
  },
  inputsContainer: {
    width: "90%",
    marginTop: 20,
  },
  input: {
    backgroundColor: "transparent",
    borderColor: COLORS.darkBlue,
    borderWidth: 1,
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  DDContainer: {
    paddingHorizontal: 10,
  },
});

export default TurnuvaBA;
