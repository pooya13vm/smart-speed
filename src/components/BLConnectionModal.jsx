import React from "react";
import styled from "styled-components";
import Lottie from "lottie-react-native";
import { Modal, View } from "react-native";
import { COLORS } from "../tools/colors";
import RectangleButton from "./RectangleButton";

const ModalContainer = styled.View`
  width: 90%;
  height: 70%;
  background-color: white;
  align-self: center;
  margin-top: 50%;
  border-radius: 20px;
  align-items: center;
`;
const AnimationContainer = styled.View`
  width: 100%;
  height: 85%;
  padding: 30px;
  align-items: center;
  justify-content: space-between;
`;
const AnimationTitle = styled.Text`
  color: ${COLORS.darkBlue};
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const BLConnectionModal = ({
  isConnected,
  isScanning,
  modalVisible,
  setModalVisible,
  disconnectBluetooth,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <ModalContainer>
        <AnimationContainer>
          {!isConnected && isScanning && (
            <>
              <AnimationTitle>Tarama ...</AnimationTitle>
              <Lottie
                style={{ flex: 1 }}
                source={require("../assets/images/lf30_editor_67friqml.json")}
                autoPlay
                loop
              />
            </>
          )}
          {isConnected && !isScanning && (
            <>
              <AnimationTitle>Bağlı</AnimationTitle>
              <Lottie
                style={{ flex: 1 }}
                source={require("../assets/images/lf30_editor_wbmr1ykq.json")}
                autoPlay
                loop={false}
              />
            </>
          )}
          {!isConnected && !isScanning && (
            <>
              <AnimationTitle>Cihazı Bulamadı</AnimationTitle>
              <AnimationTitle>
                lütfen cihazı kontrol edip tekrar deneyin
              </AnimationTitle>
              <Lottie
                style={{ flex: 1 }}
                source={require("../assets/images/lf30_editor_i9yjhkuv.json")}
                autoPlay
                loop={false}
              />
            </>
          )}
        </AnimationContainer>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
            paddingHorizontal: "5%",
          }}
        >
          {isConnected && !isScanning && (
            <RectangleButton
              onPress={() => {
                setModalVisible(false);
                disconnectBluetooth();
              }}
              title="Bağlantıyı Kes"
            />
          )}
          <RectangleButton
            onPress={() => setModalVisible(false)}
            title="Tamam"
          />
        </View>
      </ModalContainer>
    </Modal>
  );
};
export default BLConnectionModal;
