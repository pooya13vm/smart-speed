import React, { useState, useContext } from "react";
import { Alert, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "@rneui/base";
import { AppContext } from "../context/context";
import uuid from "react-native-uuid";
import styled from "styled-components";
import Lottie from "lottie-react-native";
import Icon from "react-native-vector-icons/FontAwesome";

//components
import ScreenLayout from "../components/ScreenLayout";
import { COLORS } from "../tools/colors";

//styled components
const InputContainer = styled.View`
  width: 90%;
  margin-top: 20px;
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  width: 90%;
  justify-content: flex-end;
  align-items: center;
  background-color: transparent;
  margin-bottom: 30px;
  margin-right: 15px;
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
const ButtonTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${COLORS.darkBlue};
`;
const ListContainer = styled.View`
  width: 98%;
  height: 47%;
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
const ListItemContainer = styled.View`
  width: 100%;
  padding-horizontal: 10px;
  padding-vertical: 5px;
  margin-vertical: 5px;
  flex-direction: row;
  justify-content: space-between;
`;
const ListTextContainer = styled.View`
  flex-direction: row;
  margin-right: 8px;
`;
const ListItemText = styled.Text`
  font-size: 16px;
  color: ${COLORS.darkBlue};
`;
const DeleteButton = styled.TouchableOpacity`
  border-width: 0.5px;
  padding-vertical: 5px;
  padding-horizontal: 6px;
  border-radius: 50px;
`;

const Katilimci = ({ navigation }) => {
  //context
  const { persons, setPersons } = useContext(AppContext);
  //states
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  //handlers
  const addItemToList = () => {
    if (name === "") {
      Alert.alert("uyarı", "Lütfen Formdaki Tüm Girdileri Doldurun");
    } else {
      setLoading(true);
      const newPerson = { name, id: uuid.v4() };
      setPersons([...persons, newPerson]);
      saveToStorage([...persons, newPerson]);
      setName("");
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  const deleteItem = (id) => {
    const personsCopy = [...persons];
    const filtered = personsCopy.filter((item) => item.id != id);
    setPersons(filtered);
  };
  const saveToStorage = async (katilimci) => {
    try {
      const stringified = await JSON.stringify(katilimci);
      await AsyncStorage.setItem("@katilimci", stringified);
    } catch (error) {
      console.log(error);
    }
  };

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
      title="Katılımcı Yönetimi"
      navigationFunction={() => navigation.goBack()}
    >
      <InputContainer>
        <Input
          value={name}
          label="Katilimci Adı : *"
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
          onChangeText={(val) => setName(val)}
        />
      </InputContainer>
      <ButtonContainer>
        <AddBtn onPress={addItemToList}>
          <ButtonTitle>Ekle</ButtonTitle>
        </AddBtn>
      </ButtonContainer>
      <ListContainer>
        <ListTitle>Katılımcı Listesi :</ListTitle>
        {!loading ? (
          <FlatList
            style={{ paddingHorizontal: 20, paddingVertical: 10 }}
            data={persons}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <ListItemContainer>
                <ListTextContainer>
                  <ListItemText>{index + 1 + "_"}</ListItemText>
                  <ListItemText>{item.name}</ListItemText>
                </ListTextContainer>
                <DeleteButton onPress={() => deleteItem(item.id)}>
                  <Icon name="trash" size={16} color={COLORS.darkBlue} />
                </DeleteButton>
              </ListItemContainer>
            )}
          />
        ) : (
          <AnimationContainer>
            <Lottie
              style={{ flex: 1 }}
              source={require("../assets/images/lf30_editor_e33eotje.json")}
              autoPlay
              loop
            />
            <AnimationTitle>Kaydetmek için lütfen bekleyin</AnimationTitle>
          </AnimationContainer>
        )}
      </ListContainer>
    </ScreenLayout>
  );
};

export default Katilimci;
