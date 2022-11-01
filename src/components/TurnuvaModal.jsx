import React from "react";
import { FlatList, Modal, Text, View } from "react-native";
import styled from "styled-components";
import { Button } from "@rneui/base";
import { COLORS } from "../tools/colors";

const ModalContainer = styled.View`
  width: 90%;
  height: 90%;
  background-color: white;
  align-self: center;
  margin-top: 10%;
  border-radius: 20px;
  align-items: center;
`;

const TurnuvaModal = ({
  turnuvaName,
  selectedPerson,
  setRace,
  saveRace,
  setModalVisible,
  modalVisible,
}) => {
  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <ModalContainer>
        <Text
          style={{
            marginTop: 30,
            fontSize: 24,
            fontWeight: "bold",
            color: COLORS.darkBlue,
          }}
        >
          {turnuvaName}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
            borderBottomWidth: 2,
            paddingHorizontal: 10,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: COLORS.darkBlue,
            }}
          >
            Sira
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: COLORS.darkBlue,
            }}
          >
            Katilimci
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: COLORS.darkBlue,
            }}
          >
            Sure
          </Text>
        </View>

        <FlatList
          style={{
            marginBottom: 30,
            borderBottomWidth: 2,
            borderBottomColor: COLORS.darkBlue,
          }}
          data={selectedPerson}
          keyExtractor={(item) => selectedPerson.indexOf(item)}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "space-between",
                width: "90%",
                paddingHorizontal: 10,
                marginTop: 10,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.darkBlue,
                  width: 30,
                  marginRight: "10%",
                  // textAlign: "center",
                }}
              >
                {index + 1}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.darkBlue,
                  width: 100,
                  marginLeft: "10%",
                  textAlign: "center",
                }}
              >
                {item}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.darkBlue,
                  width: 70,
                  marginLeft: "20%",

                  textAlign: "center",
                }}
              >
                00:00
              </Text>
            </View>
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
              setRace({});
              setModalVisible(false);
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
              setModalVisible(false);
            }}
          />
        </View>
      </ModalContainer>
    </Modal>
  );
};
export default TurnuvaModal;
