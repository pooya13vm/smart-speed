import React from "react";
import { Modal, View, Text } from "react-native";
import styled from "styled-components";
import Lottie from "lottie-react-native";
import { COLORS } from "../tools/colors";
import RectangleButton from "./RectangleButton";
const ModalBackground = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(23, 54, 68, 0.4);
  align-self: center;
  align-items: center;
  justify-content: center;
`;
const ModalContainer = styled.View`
  width: 80%;
  height: 47%;
  background-color: #fefefe;
  margin-top: 10%;
  border-radius: 20px;
  align-self: center;
  align-items: center;
  padding-horizontal: 15px;
`;
const WarningModal = ({
  warningVisibility,
  setWarningVisibility,
  title,
  note,
}) => {
  return (
    <Modal visible={warningVisibility} animationType="fade" transparent={true}>
      <ModalBackground>
        <ModalContainer>
          <View style={{ width: 120, height: 120 }}>
            <Lottie
              style={{ flex: 1 }}
              source={require("../assets/images/104320-warning-red.json")}
              autoPlay
              loop
            />
          </View>
          <Text
            style={{ color: COLORS.darkBlue, fontWeight: "bold", fontSize: 24 }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: COLORS.darkBlue,
              fontWeight: "bold",
              fontSize: 16,
              marginVertical: 30,
            }}
          >
            {note}
          </Text>
          <RectangleButton
            title="Tamam"
            onPress={() => setWarningVisibility(false)}
          />
        </ModalContainer>
      </ModalBackground>
    </Modal>
  );
};
export default WarningModal;
