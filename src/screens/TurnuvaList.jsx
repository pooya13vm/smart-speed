import React, { useEffect, useState, useContext } from "react";
import { FlatList } from "react-native";
import uuid from "react-native-uuid";
import Icon from "react-native-vector-icons/FontAwesome";
import styled from "styled-components";

//personal components
import ScreenLayout from "../components/ScreenLayout";
import TurnuvaModal from "../components/TurnuvaModal";
import { COLORS } from "../tools/colors";
import { AppContext } from "../context/context";
import { displayTime } from "../tools/displayTime";
import RectangleButton from "../components/RectangleButton";
import { sendBoxValue } from "./Home";
import TurnuvaResultModal from "../components/TurnuvaResultModal";

//styled components
const ListTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  border-bottom-width: 2px;
  border-bottom-color: ${COLORS.darkBlue};
  padding-horizontal: 10px;
  margin-top: 30px;
`;
const ListTitleText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${COLORS.darkBlue};
`;
const ListItemContainer = styled.View`
  flex-direction: row;
  width: 100%;
  padding-horizontal: 10px;
  margin-top: 10px;
  align-self: center;
  justify-content: space-between;
`;
const ListItemText = styled.Text`
  font-size: 16px;
  color: ${COLORS.darkBlue};
  text-align: center;
`;
const ItemNumText = styled(ListItemText)`
  width: 20%;
`;
const ItemNameText = styled(ListItemText)`
  width: 40%;
  font-weight: bold;
`;
const ItemTimeText = styled(ListItemText)`
  width: 20%;
  margin-right: 25px;
`;
const IconContainer = styled.TouchableOpacity`
  width: 20%;
  margin-right: 25px;
  align-items: center;
  border-radius: 50px;
  padding-vertical: 5px;
`;
const ButtonsContainer = styled.View`
  flex-direction: row;
  width: 90%;
  align-self: center;
  justify-content: space-around;
  margin-bottom: 30px;
`;

const TurnuvaList = ({ navigation }) => {
  //states
  const [modalVisible, setModalVisible] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [personsData, setPersonsData] = useState([]);
  const [item, setItem] = useState();
  //context
  const { saveRace, setRace, race, message, setMessage, connectedDeviceId } =
    useContext(AppContext);
  useEffect(() => {
    if (race.name) {
      let data = [];
      for (let i = 0; i < race.participants.length; i++) {
        let item = {
          name: race.participants[i].name,
          passingTime: race.participants[i].passingTime
            ? race.participants[i].passingTime
            : [],
          id: uuid.v4(),
        };
        data = [...data, item];
      }
      setPersonsData(data);
    }
    setMessage(null);
  }, [race]);

  const sendZToDevice = () => {
    sendBoxValue("Z", connectedDeviceId);
  };

  const ObjectMaker = () => {
    let myArray = [];
    race.participants.map((item) => {
      let myObj = {
        name: item.name,
        time:
          item.passingTime.length > 0
            ? item.passingTime[item.passingTime.length - 1]
            : undefined,
        id: uuid.v4(),
      };
      myArray.push(myObj);
    });
    myArray.sort((a, b) => {
      return a.time - b.time;
    });
    return myArray;
  };

  return (
    <ScreenLayout
      title={`${race.name} Turnuva Başlat`}
      navigationFunction={() => navigation.goBack()}
    >
      <ListTitleContainer>
        <ListTitleText>Sira</ListTitleText>
        <ListTitleText>Katilimci</ListTitleText>
        <ListTitleText>
          {race.participants[0].passingTime.length == 0 ? "Başlat" : "Sure"}
        </ListTitleText>
      </ListTitleContainer>
      <FlatList
        style={{
          marginBottom: 30,
          borderBottomWidth: 2,
          borderBottomColor: COLORS.darkBlue,
        }}
        data={personsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ListItemContainer>
            <ItemNumText>{index + 1}</ItemNumText>
            <ItemNameText>{item.name}</ItemNameText>
            {item.passingTime.length > 0 ? (
              <ItemTimeText style={{ width: "25%" }}>
                {displayTime(item.passingTime[item.passingTime.length - 1])}
              </ItemTimeText>
            ) : (
              <IconContainer
                onPress={() => {
                  setItem(item);
                  setModalVisible(true);
                  sendZToDevice();
                }}
              >
                <Icon name="play" size={16} color={COLORS.darkBlue} />
              </IconContainer>
            )}
          </ListItemContainer>
        )}
      />
      <ButtonsContainer>
        <RectangleButton
          title="Iptal"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
        <RectangleButton
          title="Bitiş"
          onPress={() => {
            setResultModal(true);
          }}
        />
      </ButtonsContainer>
      <TurnuvaModal
        visibility={modalVisible}
        setVisibility={setModalVisible}
        item={item}
        race={race}
        setRace={setRace}
        messageBLE={message}
        setMessageBLE={setMessage}
        sendZToDevice={sendZToDevice}
      />
      <TurnuvaResultModal
        visibility={resultModal}
        setVisibility={setResultModal}
        saveRace={saveRace}
        navigation={navigation}
        dataArray={ObjectMaker}
      />
    </ScreenLayout>
  );
};

export default TurnuvaList;
