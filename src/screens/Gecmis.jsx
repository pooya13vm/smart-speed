import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import Lottie from "lottie-react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome";

//components
import ScreenLayout from "../components/ScreenLayout";
import DropdownComponent from "../components/Dropdown";
import { COLORS } from "../tools/colors";
import { AppContext } from "../context/context";

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
const ListTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 15px;
  border-bottom-width: 2px;
  border-bottom-color: ${COLORS.darkBlue};
  padding-horizontal: 20px;
`;
const ItemContainer = styled.View`
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

const Gecmis = () => {
  //states
  const [raceData, setRaceData] = useState([]);
  const [selectedRace, setSelectedRace] = useState([]);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  //context
  const { allRaces } = useContext(AppContext);
  useEffect(() => {
    if (allRaces.length > 0) {
      let data = [];
      for (let i = 0; i < allRaces.length; i++) {
        let item = {
          label: `${allRaces[i].name}   ${allRaces[i].parkur}`,
          value: allRaces[i].id,
        };
        data = [...data, item];
      }
      setRaceData(data);
    }
  }, []);

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

  return (
    <ScreenLayout title="Geçmiş Turnuvalar">
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
                Turnuva Parkur : {selectedRace[0].parkur}
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
                    <ItemContainer>
                      <TextComponent>{item.name}</TextComponent>
                      <TextComponent>{item.time}</TextComponent>
                    </ItemContainer>
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
              <ButtonContainer>
                <Icon name="trash" size={24} color={COLORS.darkBlue} />
              </ButtonContainer>
            )}
          </DataContainer>
        )}
      </Container>
    </ScreenLayout>
  );
};

export default Gecmis;
