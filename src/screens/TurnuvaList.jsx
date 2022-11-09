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

//styled components
const ListTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  border-bottom-width: 2px;
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
  const [personsData, setPersonsData] = useState([]);
  const [item, setItem] = useState();
  //context
  const { saveRace, setRace, race } = useContext(AppContext);

  useEffect(() => {
    if (race.name) {
      let data = [];
      for (let i = 0; i < race.persons.length; i++) {
        let item = {
          name: race.persons[i],
          passingTime: race.passingTime[i] ? race.passingTime[i] : [],
          id: uuid.v4(),
        };
        data = [...data, item];
      }
      setPersonsData(data);
    }
  }, [race]);

  return (
    <ScreenLayout
      title={`${race.name} Turnuva Başlat`}
      navigationFunction={() => navigation.goBack()}
    >
      <ListTitleContainer>
        <ListTitleText>Sira</ListTitleText>
        <ListTitleText>Katilimci</ListTitleText>
        <ListTitleText>
          {race.passingTime.length == 0 ? "Başlat" : "Sure"}
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
            saveRace();
            navigation.navigate("Home");
          }}
        />
      </ButtonsContainer>
      <TurnuvaModal
        visibility={modalVisible}
        setVisibility={setModalVisible}
        item={item}
        race={race}
        setRace={setRace}
      />
    </ScreenLayout>
  );
};

export default TurnuvaList;
