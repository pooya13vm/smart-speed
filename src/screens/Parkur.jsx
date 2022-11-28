import React, { useState, useContext, useRef, useEffect } from "react";
import { FlatList, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "@rneui/base";
import styled from "styled-components";
import Lottie from "lottie-react-native";
import uuid from "react-native-uuid";

//components
import ScreenLayout from "../components/ScreenLayout";
import { COLORS } from "../tools/colors";
import DropdownComponent from "../components/Dropdown";
import ParkurItem from "../components/ParkurListItem";
import WarningModal from "../components/WarningModal";

//context
import { AppContext } from "../context/context";

const DropdownData = [
  { label: "Tek Renk", value: "Tek Renk" },
  { label: "Renkli", value: "Renkli" },
];
const DropdownDataNumbers = [
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
  { label: "7", value: 7 },
  { label: "8", value: 8 },
  { label: "9", value: 9 },
  { label: "10", value: 10 },
  { label: "11", value: 11 },
  { label: "12", value: 12 },
];

//styled components
const NameInputContainer = styled.View`
  width: 90%;
  margin-top: 20px;
`;
const InputsContainer = styled.View`
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 6%;
`;
const Dropdown1Container = styled.View`
  width: 35%;
`;
const Dropdown2Container = styled.View`
  width: 38%;
`;
const AddBtn = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  padding: 10px;
  border-radius: 60px;
  border-color: ${COLORS.darkBlue};
`;
const AddBtnTitle = styled.Text`
  fontsize: 16px;
  font-weight: bold;
  color: ${COLORS.darkBlue};
`;
const ListContainer = styled.View`
  width: 98%;
  height: 50%;
  border-width: 2px;
  border-radius: 30px;
  border-color: ${COLORS.darkBlue};
  padding-bottom: 10px;
`;
const ListTitle = styled.Text`
  margin-left: 20px;
  margin-top: 10px;
  font-size: 17px;
  font-weight: bold;
  color: ${COLORS.darkBlue};
`;
const AnimationContainer = styled.View`
  width: 100%;
  height: 100%;
  padding: 30px;
  align-items: center;
  justify-content: space-between;
`;
const AnimationTitle = styled.Text`
  color: ${COLORS.darkBlue};
`;

const Parkur = ({ navigation }) => {
  //states
  const [parkurName, setParkurName] = useState("");
  const [number, setNumber] = useState("");
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);
  const [warningVisibility, setWarningVisibility] = useState(false);
  //context
  const { parkur, setParkur } = useContext(AppContext);

  //animation
  const progress = useRef(new Animated.Value(0)).current;
  const handleLikeAnimation = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  //handlers
  const addItemToList = () => {
    if (parkurName === "" || number === "" || tip === "") {
      setWarningVisibility(true);
    } else {
      setLoading(true);
      const newParkur = { name: parkurName, number, tip, id: uuid.v4() };
      setParkur([...parkur, newParkur]);
      saveToStorage([...parkur, newParkur]);
      setParkurName("");
      setNumber("");
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  const deleteItem = (id) => {
    const parkurCopy = [...parkur];
    const filtered = parkurCopy.filter((item) => item.id != id);
    setParkur(filtered);
    saveToStorage(filtered);
  };
  const saveToStorage = async (parkur) => {
    try {
      const stringified = await JSON.stringify(parkur);
      await AsyncStorage.setItem("@parkur", stringified);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleLikeAnimation();
  }, []);

  const inputsStyle = {
    backgroundColor: "transparent",
    borderColor: COLORS.darkBlue,
    borderWidth: 1,
    width: "75%",
    borderRadius: 10,
    paddingHorizontal: 16,
  };

  return (
    <ScreenLayout
      title="Parkur Oluştur"
      navigationFunction={() => navigation.goBack()}
    >
      <NameInputContainer>
        <Input
          value={parkurName}
          label="Parkur Adı : *"
          style={inputsStyle}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          inputStyle={{
            color: COLORS.darkGreen,
          }}
          labelStyle={{
            marginBottom: 10,
            color: COLORS.darkBlue,
            marginLeft: 5,
          }}
          containerStyle={{
            margin: 0,
            padding: 0,
            maxHeight: 72,
          }}
          onChangeText={(val) => setParkurName(val)}
        />
      </NameInputContainer>
      <InputsContainer>
        {/* <Input
          placeholder="Cihaz Sayısı"
          placeholderTextColor={COLORS.darkGreen}
          value={number}
          containerStyle={{
            width: "30%",
            alignItems: "center",
          }}
          keyboardType="number-pad"
          inputStyle={{
            color: COLORS.darkGreen,
            textAlign: "center",
          }}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: COLORS.darkBlue,
            fontSize: 14,
            marginTop: 26,
          }}
          onChangeText={(val) => setNumber(val)}
        /> */}
        <Dropdown1Container>
          <DropdownComponent
            placeholder="Cihaz"
            data={DropdownDataNumbers}
            onChangeSet={setNumber}
          />
        </Dropdown1Container>
        <Dropdown2Container>
          <DropdownComponent
            placeholder="Tipi Seç"
            data={DropdownData}
            onChangeSet={setTip}
          />
        </Dropdown2Container>
        <AddBtn onPress={addItemToList}>
          <AddBtnTitle>Ekle</AddBtnTitle>
        </AddBtn>
      </InputsContainer>
      <ListContainer>
        <ListTitle>Mecvut Parkurlar :</ListTitle>
        {!loading ? (
          <FlatList
            style={{ paddingHorizontal: 20, paddingVertical: 10 }}
            data={parkur}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ParkurItem item={item} deleteItem={deleteItem} />
            )}
          />
        ) : (
          <AnimationContainer>
            <Lottie
              progress={progress}
              style={{ flex: 1 }}
              source={require("../assets/images/lf30_editor_e33eotje.json")}
              autoPlay
              loop
            />
            <AnimationTitle>Kaydetmek için lütfen bekleyin</AnimationTitle>
          </AnimationContainer>
        )}
      </ListContainer>
      <WarningModal
        setWarningVisibility={setWarningVisibility}
        warningVisibility={warningVisibility}
        title="Ayy !!!"
        note="Lütfen Formdaki Tüm Girdileri Doldurun."
      />
    </ScreenLayout>
  );
};

export default Parkur;
