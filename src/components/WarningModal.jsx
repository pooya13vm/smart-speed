import React from "react";
import { Modal } from "react-native";
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
const AnimationContainer = styled.View`
  width: 120px;
  height: 120px;
`;
const TitleText = styled.Text`
  color: ${COLORS.darkBlue};
  font-weight: bold;
  font-size: 24px;
`;
const NoteText = styled.Text`
  color: ${COLORS.darkBlue};
  font-weight: bold;
  font-size: 16px;
  margin-vertical: 30px;
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
          <AnimationContainer>
            <Lottie
              style={{ flex: 1 }}
              source={require("../assets/images/104320-warning-red.json")}
              autoPlay
              loop
            />
          </AnimationContainer>
          <TitleText>{title}</TitleText>
          <NoteText>{note}</NoteText>
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
