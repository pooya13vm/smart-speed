import React, { useEffect } from "react";
import { FlatList, Modal, View, Text } from "react-native";
// import styled from "styled-components";
import { Button } from "@rneui/base";
import { COLORS } from "../tools/colors";
import TurnuvaItem from "../components/TurnuvaItems";
import base64 from "react-native-base64";
import { BleManager } from "react-native-ble-plx";

const BLTManager = new BleManager();

const BOX_UUID = "f27b53ad-c63d-49a0-8c0f-9f297e6cc520";
const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";

// const ModalContainer = styled.View`
//   width: 90%;
//   height: 90%;
//   background-color: white;
//   align-self: center;
//   margin-top: 10%;
//   border-radius: 20px;
//   align-items: center;
// `;
// const Title = styled.Text`
//   margin-top: 30px;
//   font-size: 24px;
//   font-weight: bold;``
//   color: ${COLORS.darkBlue};
// `;
// const ListContainer = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
//   width: 90%;
//   border-bottom-width: 2px;
//   padding-horizontal: 10px;
//   margin-top: 20px;
// `;
// const ListTitle = styled.Text`
//   font-size: 18px;
//   font-weight: bold;
//   color: ${COLORS.darkBlue};
// `;

const TurnuvaModal = ({
  turnuvaName,
  selectedPerson,
  setRace,
  saveRace,
  setModalVisible,
  modalVisible,
  connectedDevice,
}) => {
  useEffect(() => {
    const sendBoxValue = async () => {
      BLTManager.writeCharacteristicWithResponseForDevice(
        connectedDevice.id,
        SERVICE_UUID,
        BOX_UUID,
        base64.encode(selectedPerson.length.toString())
      ).then((characteristic) => {
        console.log(
          "Boxvalue changed to :",
          base64.decode(characteristic.value)
        );
      });
    };
    sendBoxValue();
  }, [selectedPerson]);

  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <View
        style={{
          width: "90%",
          height: "90%",
          backgroundColor: "white",
          alignSelf: "center",
          marginTop: "10%",
          borderRadius: 20,
          alignItems: "center",
        }}
      >
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
            <TurnuvaItem item={item} index={index} />
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
      </View>
    </Modal>
  );
};
export default TurnuvaModal;
