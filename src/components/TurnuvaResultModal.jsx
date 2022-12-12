import React from "react";
import { Modal, FlatList, View, Text } from "react-native";
import styled from "styled-components";
import { COLORS } from "../tools/colors";
import { displayTime } from "../tools/displayTime";
import CircleButton from "./CircleButton";

const ModalBackground = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(23, 54, 68, 0.9);
  align-self: center;
  align-items: center;
`;
const ModalContainer = styled.View`
  width: 90%;
  height: 90%;
  background-color: #fefefe;
  margin-top: 10%;
  border-radius: 20px;
  align-self: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 26px;
  color: ${COLORS.darkBlue};
  margin-vertical: 20px;
  padding-horizontal: 20px;
  font-weight: bold;
`;

const TurnuvaResultModal = ({
  visibility,
  setVisibility,
  saveRace,
  navigation,
  dataArray,
}) => {
  let data = dataArray();

  return (
    <Modal animationType="slide" visible={visibility} transparent={true}>
      <ModalBackground>
        <ModalContainer>
          <Title>Turnuva Sonucu</Title>
          <FlatList
            style={{
              width: "85%",
            }}
            contentContainerStyle={{
              justifyContent: "space-around",
            }}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginVertical: 20,
                }}
              >
                <Text
                  style={{
                    color: COLORS.darkBlue,
                    fontSize: 17,
                    fontWeight: "bold",
                  }}
                >{`${index + 1} ->`}</Text>
                <Text
                  style={{
                    color: COLORS.darkBlue,
                    fontSize: 17,
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: COLORS.darkBlue,
                    fontSize: 17,
                    fontWeight: "bold",
                  }}
                >
                  {displayTime(item.time)}
                </Text>
              </View>
            )}
          />
          <View style={{ marginBottom: 50 }}>
            <CircleButton
              title="Tamam"
              onPressFunction={() => {
                saveRace();
                setVisibility(false);
                navigation.navigate("Home");
              }}
            />
          </View>
        </ModalContainer>
      </ModalBackground>
    </Modal>
  );
};
export default TurnuvaResultModal;
