import React, { useContext, useEffect, useState, useRef } from "react";
import { FlatList, Modal, Animated, Alert, Share } from "react-native";
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
import RectangleButton from "../components/RectangleButton";
import { makeTurkishDate } from "../tools/turkishCalender";

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
const ButtonMainContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

// detail Modal styles components
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
const ModalButtonContainer = styled.View`
  margin-bottom: 40px;
`;
// be sure modal styles
const ModalBackground2 = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(23, 54, 68, 0.4);
  align-self: center;
  align-items: center;
  justify-content: center;
`;
const ModalContainer2 = styled.View`
  width: 80%;
  height: 47%;
  background-color: #fefefe;
  margin-top: 10%;
  border-radius: 20px;
  align-self: center;
  align-items: center;
  padding-horizontal: 15px;
`;
const ModalAnimationSize = styled.View`
  width: 120px;
  height: 120px;
`;
const ModalTitleWarning = styled.Text`
  color: ${COLORS.darkBlue};
  font-weight: bold;
  font-size: 24px;
`;
const ModalTextWarning = styled.Text`
  color: ${COLORS.darkBlue};
  font-weight: bold;
  font-size: 16px;
  margin-vertical: 30px;
`;
const ModalBtnContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  margin-top: 30px;
`;

const Gecmis = ({ navigation }) => {
  //states
  const [raceData, setRaceData] = useState([]);
  const [selectedRace, setSelectedRace] = useState([]);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [personsData, setPersonsData] = useState();
  const [warningVisibility, setWarningVisibility] = useState(false);

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
    fullDataMaker(filtered);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const fullDataMaker = (item) => {
    setPersonsData(item[0].participants);
  };
  const listMaker = (item) => {
    try {
      if (item.length > 0) {
        let data = [];
        let raceItem = item[0].participants;
        for (let i = 0; i < raceItem.length; i++) {
          let obj = {
            name: raceItem[i].name,
            time:
              raceItem[i].passingTime.length > 0
                ? raceItem[i].passingTime[raceItem[i].passingTime.length - 1]
                : "00:00",
            id: i,
          };
          data.push(obj);
        }
        data.sort((a, b) => {
          return +a.time - +b.time;
        });
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
  const handleShowDetail = (name) => {
    const filtered = personsData.filter((item) => item.name === name);
    console.log("filtered", filtered);
    setSelectedItem(filtered[0]);
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
        let personDetail = `${item.name} ${displayTime(item.time)}`;
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
                Turnuva Adı : {selectedRace[0].name}
              </TextComponent>
              <TextComponent>
                Turnuva Parkuru : {selectedRace[0].parkurName}
              </TextComponent>
              <TextComponent>
                Turnuva Tarihi : {makeTurkishDate(selectedRace[0].date)}
              </TextComponent>
              <ListTitleContainer>
                <ListTitle>Katılımcılar</ListTitle>
                <ListTitle>Süre</ListTitle>
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
                          handleShowDetail(item.name);
                          setShowDetail((pre) => !pre);
                        }}
                      >
                        <TextComponent>{item.name}</TextComponent>
                        <TimeAndIconCon>
                          <TextComponent>
                            {displayTime(item.time)}
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
                  <AnimationTitle>Lütfen bekleyin</AnimationTitle>
                </AnimationContainer>
              )}
            </DataTopContainer>
            {!loading && (
              <ButtonMainContainer>
                <ButtonContainer onPress={() => setWarningVisibility(true)}>
                  <Icon name="trash" size={24} color={COLORS.darkBlue} />
                </ButtonContainer>
                <ButtonContainer onPress={onShare}>
                  <Icon name="share-alt" size={24} color={COLORS.darkBlue} />
                </ButtonContainer>
              </ButtonMainContainer>
            )}
          </DataContainer>
        )}
        {/* --------------detail modal------------ */}
        {selectedItem.name && (
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
                <FlatList
                  contentContainerStyle={{
                    alignItems: "center",
                    paddingBottom: 10,
                  }}
                  data={selectedItem.passingTime}
                  renderItem={({ item, index }) => {
                    const isEnd = index === selectedItem.passingTime.length - 1;
                    return (
                      <ModalListItemContainer>
                        <ModalItemText>{`${index + 1} ->`}</ModalItemText>
                        <Icon
                          name={!isEnd ? "flag" : "flag-checkered"}
                          size={20}
                          color={COLORS.darkBlue}
                        />
                        <ModalItemText isEnd={isEnd}>
                          {displayTime(item)}
                        </ModalItemText>
                      </ModalListItemContainer>
                    );
                  }}
                />
                <ModalButtonContainer>
                  <CircleButton
                    title="Tamam"
                    onPressFunction={() => setShowDetail(false)}
                  />
                </ModalButtonContainer>
              </ModalContainer>
            </ModalBackground>
          </Modal>
        )}
        {/* ---------------be sure modal----------- */}
        <Modal
          visible={warningVisibility}
          animationType="fade"
          transparent={true}
        >
          <ModalBackground2>
            <ModalContainer2>
              <ModalAnimationSize>
                <Lottie
                  style={{ flex: 1 }}
                  source={require("../assets/images/104320-warning-red.json")}
                  autoPlay
                  loop
                />
              </ModalAnimationSize>
              <ModalTitleWarning>"Lütfen Dikkatli Ol"</ModalTitleWarning>
              <ModalTextWarning>
                "öğeyi sileceğinizden emin misiniz?""
              </ModalTextWarning>
              <ModalBtnContainer>
                <RectangleButton
                  title="Hayır"
                  onPress={() => setWarningVisibility(false)}
                />
                <RectangleButton
                  title="Evet"
                  onPress={() => {
                    deleteHandler(selectedRace[0].id);
                    setWarningVisibility(false);
                  }}
                />
              </ModalBtnContainer>
            </ModalContainer2>
          </ModalBackground2>
        </Modal>
      </Container>
    </ScreenLayout>
  );
};

export default Gecmis;
