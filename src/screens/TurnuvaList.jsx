import React, { useEffect, useState, useContext } from "react";
import TurnuvaModal from "../components/TurnuvaModal";
import ScreenLayout from "../components/ScreenLayout";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Button } from "@rneui/base";
import { COLORS } from "../tools/colors";
import uuid from "react-native-uuid";
import Icon from "react-native-vector-icons/FontAwesome";
import styled from "styled-components";
import { AppContext } from "../context/context";
import { displayTime } from "../tools/displayTime";

const ListItemContainer = styled.View`
  flex-direction: row;
  width: 100%;
  padding-horizontal: 10px;
  margin-top: 10px;
  align-self: center;
  justify-content: space-between;
`;
const ListItemText = styled.Text`
  font-size: 16;
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

const TurnuvaList = ({ navigation }) => {
  const { saveRace, setRace, race } = useContext(AppContext);
  console.log("race : ", race);
  const [modalVisible, setModalVisible] = useState(false);
  const [personsData, setPersonsData] = useState([]);
  const [item, setItem] = useState();

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

  console.log("personData :", race);

  return (
    <ScreenLayout
      title={`${race.name} Turnuva Başlat`}
      navigationFunction={() => navigation.goBack()}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
          borderBottomWidth: 2,
          paddingHorizontal: 10,
          marginTop: 30,
        }}
      >
        <Text
          style={{ fontSize: 18, fontWeight: "bold", color: COLORS.darkBlue }}
        >
          Sira
        </Text>
        <Text
          style={{ fontSize: 18, fontWeight: "bold", color: COLORS.darkBlue }}
        >
          Katilimci
        </Text>
        <Text
          style={{ fontSize: 18, fontWeight: "bold", color: COLORS.darkBlue }}
        >
          {race.passingTime.length == 0 ? "Başlat" : "Sure"}
        </Text>
      </View>
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
              <TouchableOpacity
                onPress={() => {
                  setItem(item);
                  setModalVisible(true);
                }}
                style={{
                  width: "20%",
                  marginRight: 25,
                  alignItems: "center",
                  // borderWidth: 1,
                  borderRadius: 50,
                  paddingVertical: 5,
                }}
              >
                <Icon name="play" size={16} color={COLORS.darkBlue} />
              </TouchableOpacity>
            )}
          </ListItemContainer>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          alignSelf: "center",
          justifyContent: "space-around",
          marginBottom: 30,
        }}
      >
        <Button
          title="Iptal"
          onPress={() => {
            // setRace({});
            navigation.navigate("Home");
          }}
          type="outline"
          containerStyle={{
            width: 120,
            borderWidth: 1,
            borderColor: COLORS.darkBlue,
            borderRadius: 10,
          }}
          titleStyle={{ color: COLORS.darkBlue }}
        />
        <Button
          title="Bitiş"
          type="outline"
          containerStyle={{
            width: 120,
            borderWidth: 1,
            borderColor: COLORS.darkBlue,
            borderRadius: 10,
          }}
          titleStyle={{ color: COLORS.darkBlue }}
          onPress={() => {
            saveRace();
            navigation.navigate("Home");
          }}
        />
      </View>
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
