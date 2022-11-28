import React, { useContext, useEffect, useState, useRef } from "react";
import { FlatList, Modal, Animated, Alert } from "react-native";
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
import { View, Text, Share } from "react-native";

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
  justify-content: space-around;
`;
const DataTopContainer = styled.View`
  margin-left: 10px;
`;
const TextComponent = styled.Text`
  font-size: 16px;
  color: ${COLORS.darkBlue};
`;
const ListTitle = styled(TextComponent)`
  font-weight: bold;
`;
const TimeAndIconCon = styled.View`
  flex-direction: row;
  width: 100px;
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
  padding-horizontal: 14px;
  padding-vertical: 12px;
  border-color: ${COLORS.darkBlue};
`;

//Modal styles components
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
const ModalAnimationContainer = styled.View`
  width: 200px;
  height: 200px;
  align-items: center;
`;
const ModalTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${COLORS.darkBlue};
`;
const ModalFirstItemContainer = styled.View`
  flex-direction: row;
  width: 60%;
  justify-content: space-around;
  align-items: center;
  margin-vertical: 5px;
`;
const ModalFirstItemText = styled.Text`
  font-size: 16px;
  margin-vertical: 5px;
  color: ${COLORS.darkBlue};
`;
const ModalListItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 70%;
  margin-vertical: 15px;
`;
const ModalItemText = styled.Text`
  font-size: 20px;
  color: ${(props) => (!props.isEnd ? COLORS.darkBlue : COLORS.lightGreen)};
  font-weight: ${(props) => (props.isEnd ? "bold" : "400")};
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
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "hi",
        message: `Turnuva Adi : << *${selectedRace[0].name}*  >>
        Turnuva Parkur : ${selectedRace[0].parkurName}
        Turnuva Tarihi : ${selectedRace[0].date}
        ${shareTextHandler()}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          Alert.alert("Hata kodu 4532E");
        } else {
          Alert.alert("Hata kodu 4533E");
        }
      } else if (result.action === Share.dismissedAction) {
        Alert.alert("Hata kodu 4535E");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const shareTextHandler = () => {
    let text = "";
    if (listData.length > 0) {
      listData.map((item) => {
        let personDetail = `${item.name} ${displayTime(
          item.time[item.time.length - 1]
        )}`;
        text = `${text} \n ${personDetail} `;
      });
    }
    return text;
  };

  return (
    <ScreenLayout
      title="Geçmiş Turnuvalar"
      navigationFunction={() => navigation.goBack()}
    >
      <Container>
        <DDcontainer>
          <DropdownComponent
            placeholder="Turnuva Seç"
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
                <ListTitle>Katiliciler</ListTitle>
                <ListTitle>Sure</ListTitle>
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
                            {item.time
                              ? displayTime(item.time[item.time.length - 1])
                              : "00:00:00"}
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
                    loop={false}
                  />
                  <AnimationTitle>lütfen bekleyin</AnimationTitle>
                </AnimationContainer>
              )}
            </DataTopContainer>
            {!loading && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <ButtonContainer
                  onPress={() => deleteHandler(selectedRace[0].id)}
                >
                  <Icon name="trash" size={24} color={COLORS.darkBlue} />
                </ButtonContainer>
                <ButtonContainer onPress={onShare}>
                  <Icon name="share-alt" size={24} color={COLORS.darkBlue} />
                </ButtonContainer>
              </View>
            )}
          </DataContainer>
        )}
        <Modal visible={showDetail} animationType="fade" transparent={true}>
          <ModalBackground>
            <ModalContainer>
              <ModalAnimationContainer>
                <Lottie
                  progress={progress}
                  style={{ flex: 1 }}
                  loop={false}
                  autoPlay
                  source={require("../assets/images/lf30_editor_rcr7wshw.json")}
                />
              </ModalAnimationContainer>
              <ModalTitle>{selectedItem.name}</ModalTitle>
              {/* <ModalFirstItemContainer>
                <Icon name="flag-o" color={COLORS.darkBlue} size={22} />
                <ModalFirstItemText>Başlangıç ​​Noktası</ModalFirstItemText>
              </ModalFirstItemContainer> */}
              <FlatList
                contentContainerStyle={{
                  alignItems: "center",
                  paddingBottom: 10,
                }}
                data={selectedItem.time}
                renderItem={({ item, index }) => {
                  const isEnd = index === selectedItem.time.length - 1;
                  return (
                    <ModalListItemContainer>
                      <Icon
                        name={!isEnd ? "flag" : "flag-checkered"}
                        size={22}
                        color={COLORS.darkBlue}
                      />
                      <ModalItemText isEnd={isEnd}>
                        {displayTime(item)}
                      </ModalItemText>
                    </ModalListItemContainer>
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
