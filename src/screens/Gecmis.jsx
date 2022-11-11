import React, { useContext, useEffect, useState, useRef } from "react";
import { FlatList, Modal, Animated } from "react-native";
import Lottie from "lottie-react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome";

//components
import ScreenLayout from "../components/ScreenLayout";
import DropdownComponent from "../components/Dropdown";
import { COLORS } from "../tools/colors";
import { AppContext } from "../context/context";
import { displayTime } from "../tools/displayTime";
import CircleButton from "../components/CircleButton";
import { View, Text, TouchableOpacity } from "react-native";

//styled components
const Container = styled.View`
  width: 100%;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
  height: 75%;
`;
const DDcontainer = styled.View`
  width: 90%;
`;
const DataContainer = styled.View`
  height: 85%;
  width: 100%;
  padding-horizontal: 15px;
  justify-content: space-between;
`;
const DataTopContainer = styled.View`
  margin-left: 10px;
`;
const TextComponent = styled.Text`
  font-size: 16px;
  color: ${COLORS.darkBlue};
`;
const TimeAndIconCon = styled.View`
  flex-direction: row;
  width: 100;
  justify-content: space-between;
`;
const ListTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 15px;
  border-bottom-width: 2px;
  border-bottom-color: ${COLORS.darkBlue};
  padding-horizontal: 20px;
`;
const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 20px;
  margin-vertical: 8px;
`;
const AnimationContainer = styled.View`
  width: 100%;
  height: 70%;
  padding: 30px;
  align-items: center;
  justify-content: space-between;
`;
const AnimationTitle = styled.Text`
  color: ${COLORS.darkBlue};
`;
const ButtonContainer = styled.TouchableOpacity`
  align-self: center;
  border-radius: 80px;
  border-width: 2px;
  padding-horizontal: 15px;
  padding-vertical: 12px;
  border-color: ${COLORS.darkBlue};
`;
const ModalBackground = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(23, 54, 68, 0.8);
  align-self: center;
  align-items: center;
  justify-content: center;
`;
const ModalContainer = styled.View`
  width: 90%;
  height: 80%;
  background-color: #fefefe;
  margin-top: 10%;
  border-radius: 20px;
  align-self: center;
  align-items: center;
`;

const Gecmis = ({ navigation }) => {
  //states
  const [raceData, setRaceData] = useState([]);
  const [selectedRace, setSelectedRace] = useState([]);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  //context
  const { allRaces, setAllRaces, saveAllRacesToStorage } =
    useContext(AppContext);

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (allRaces.length > 0) {
      let data = [];
      for (let i = 0; i < allRaces.length; i++) {
        let item = {
          label: `${allRaces[i].name}   ${allRaces[i].parkurName}`,
          value: allRaces[i].id,
        };
        data = [...data, item];
      }
      setRaceData(data);
    }
  }, [allRaces]);

  //handlers
  const handleSelectedRace = async (id) => {
    setLoading(true);
    const filtered = await allRaces.filter((item) => item.id === id);
    setSelectedRace(filtered);
    listMaker(filtered);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const listMaker = (item) => {
    try {
      if (item.length > 0) {
        let data = [];
        for (let i = 0; i < item[0].persons.length; i++) {
          let obj = {
            name: item[0].persons[i],
            time: item[0].passingTime[0] ? item[0].passingTime[i] : "00:00",
            id: i,
          };
          data.push(obj);
        }
        setListData(data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const deleteHandler = (id) => {
    const filtered = allRaces.filter((item) => item.id !== id);
    setAllRaces(filtered);
    saveAllRacesToStorage(filtered);
    setSelectedRace([]);
  };
  const handleShowDetail = (item) => {
    setSelectedItem(item);
  };

  return (
    <ScreenLayout
      title="Geçmiş Turnuvalar"
      navigationFunction={() => navigation.goBack()}
    >
      <Container>
        <DDcontainer>
          <DropdownComponent
            placeholder="Turnuva Sec"
            data={raceData}
            onChangeSet={(id) => handleSelectedRace(id)}
          />
        </DDcontainer>
        {selectedRace.length > 0 && (
          <DataContainer>
            <DataTopContainer>
              <TextComponent>
                Turnuva Adi : {selectedRace[0].name}
              </TextComponent>
              <TextComponent>
                Turnuva Parkur : {selectedRace[0].parkurName}
              </TextComponent>
              <TextComponent>
                Turnuva Tarihi : {selectedRace[0].date}
              </TextComponent>
              <ListTitleContainer>
                <TextComponent>Katiliciler</TextComponent>
                <TextComponent>Sure</TextComponent>
              </ListTitleContainer>
              {!loading ? (
                <FlatList
                  style={{
                    height: "60%",
                    paddingBottom: 10,
                  }}
                  data={listData}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <>
                      <ItemContainer
                        onPress={() => {
                          handleShowDetail(item);
                          setShowDetail((pre) => !pre);
                        }}
                      >
                        <TextComponent>{item.name}</TextComponent>
                        <TimeAndIconCon>
                          <TextComponent>
                            {displayTime(item.time[item.time.length - 1])}
                          </TextComponent>

                          <Icon
                            name="angle-right"
                            size={20}
                            color={COLORS.darkBlue}
                          />
                        </TimeAndIconCon>
                      </ItemContainer>
                    </>
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
                  <AnimationTitle>lütfen bekleyin</AnimationTitle>
                </AnimationContainer>
              )}
            </DataTopContainer>
            {!loading && (
              <ButtonContainer
                onPress={() => deleteHandler(selectedRace[0].id)}
              >
                <Icon name="trash" size={24} color={COLORS.darkBlue} />
              </ButtonContainer>
            )}
          </DataContainer>
        )}
        <Modal visible={showDetail} animationType="fade" transparent={true}>
          <ModalBackground>
            <ModalContainer>
              <View
                style={{
                  width: 200,
                  height: 200,
                  alignItems: "center",
                }}
              >
                <Lottie
                  progress={progress}
                  style={{ flex: 1 }}
                  loop={false}
                  autoPlay
                  source={require("../assets/images/lf30_editor_rcr7wshw.json")}
                />
              </View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: COLORS.darkBlue,
                }}
              >
                {selectedItem.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "60%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <Icon name="flag-o" color={COLORS.darkBlue} size={22} />
                <Text
                  style={{
                    fontSize: 16,
                    marginVertical: 5,
                    color: COLORS.darkBlue,
                  }}
                >
                  Başlangıç ​​Noktası
                </Text>
              </View>
              <FlatList
                contentContainerStyle={{
                  alignItems: "center",
                }}
                data={selectedItem.time}
                renderItem={({ item, index }) => {
                  const isEnd = index === selectedItem.time.length - 1;
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        width: "70%",
                        marginVertical: 15,
                      }}
                    >
                      {console.log(item)}
                      <Icon
                        name={!isEnd ? "flag" : "flag-checkered"}
                        size={22}
                        color={COLORS.darkBlue}
                      />
                      <Text
                        style={{
                          fontSize: 20,
                          color: !isEnd ? COLORS.darkBlue : COLORS.lightGreen,
                          fontWeight: isEnd ? "bold" : null,
                        }}
                      >
                        {displayTime(item)}
                      </Text>
                    </View>
                  );
                }}
              />
              <View style={{ marginBottom: 40 }}>
                <CircleButton
                  title="Tamam"
                  onPressFunction={() => setShowDetail(false)}
                />
              </View>
            </ModalContainer>
          </ModalBackground>
        </Modal>
      </Container>
    </ScreenLayout>
  );
};

export default Gecmis;
