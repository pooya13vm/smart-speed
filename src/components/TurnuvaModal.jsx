import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "react-native";
import styled from "styled-components";

//personal component
import { COLORS } from "../tools/colors";
import { displayTime } from "../tools/displayTime";
import RectangleButton from "./RectangleButton";
import TurnuvaTimeFlatList from "./TurnuvaTimeFlatList";

//styled components
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
const CloseBtnContainer = styled.TouchableOpacity`
  padding-vertical: 6px;
  padding-horizontal: 10px;
  background-color: #f4f4f4;
  border-radius: 100px;
  position: absolute;
  right: 5px;
  top: 2px;
`;
const CloseBtnText = styled.Text`
  color: ${COLORS.darkBlue};
`;
const Title = styled.Text`
  font-size: 26px;
  color: ${COLORS.darkBlue};
  margin-vertical: 20px;
  padding-horizontal: 20px;
  font-weight: bold;
`;
const TimerContainer = styled.View`
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.darkBlue};
  border-radius: 120px;
`;
const TimerText = styled.Text`
  font-size: 28px;
  color: #fefefe;
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  width: 90%;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 40px;
`;

const TurnuvaModal = ({
  visibility,
  setVisibility,
  item,
  setRace,
  race,
  messageBLE,
  setMessageBLE,
  sendZToDevice,
}) => {
  const [devices, setDevices] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const [time, setTime] = useState(0);
  const [isReset, setReset] = useState(false);
  const timer = useRef(null);
  console.log(race);
  useEffect(() => {
    let myArray = [];
    for (let i = 0; i < (+race.deviceNum * 2 - 1) * +race.repeat; i++) {
      myArray.push(0);
    }
    setDevices(myArray);
    if (messageBLE) {
      start();
    }
  }, [isReset, messageBLE]);

  const start = useCallback(() => {
    if (messageBLE) {
      if (messageBLE === "b") {
        console.log("in start ...");
        const copy = [...devices];
        copy[0] = "Başladı";
        setDevices(copy);
        setIsRunning(true);

        const interval = setInterval(() => {
          setTime((previousTime) => previousTime + 1);
        }, 10);
        timer.current = interval;
      }
      if (+messageBLE < +race.deviceNum * 2 - 2) {
        if (isRunning) {
          const copy = [...devices];
          copy[messageBLE] = time;
          setDevices(copy);
        }
      }
      if (+messageBLE === +race.deviceNum * 2 - 2) {
        const copy = [...devices];
        copy[messageBLE] = time;
        setDevices(copy);
        setFinished(true);
        clearInterval(timer.current);
      }
    }
  }, [time, messageBLE]);

  const resetHandler = () => {
    if (isFinished) {
      setDevices([]);
      setTime(0);
      setIsRunning(false);
      setFinished(false);
      setReset(!isReset);
      setMessageBLE(null);
      sendZToDevice();
    }
  };
  const saveTimesToList = () => {
    let name = item.name;
    console.log("name :", name);
    let racePersons = race.persons;
    console.log("persons Array :", racePersons);
    let indexOfPerson = racePersons.indexOf(name);
    let objectCopy = { ...race };
    objectCopy.passingTime[indexOfPerson] = devices;
    setRace({ ...objectCopy });
    setVisibility(false);
    setDevices([]);
    setTime(0);
    setIsRunning(false);
    setFinished(false);
    setMessageBLE(null);
    setReset(!isReset);
  };
  if (item) {
    return (
      <Modal animationType="slide" visible={visibility} transparent={true}>
        <ModalBackground>
          <ModalContainer>
            <CloseBtnContainer
              onPress={() => {
                resetHandler();
                setVisibility(false);
              }}
            >
              <CloseBtnText>X</CloseBtnText>
            </CloseBtnContainer>
            <Title>{item.name}</Title>
            <TimerContainer>
              <TimerText>{displayTime(time)}</TimerText>
            </TimerContainer>
            <TurnuvaTimeFlatList devices={devices} num={race.deviceNum} />
            {isFinished && (
              <ButtonContainer>
                <RectangleButton title="Tekrar" onPress={resetHandler} />
                <RectangleButton title="Kaydet" onPress={saveTimesToList} />
              </ButtonContainer>
            )}
          </ModalContainer>
        </ModalBackground>
      </Modal>
    );
  }
};

export default TurnuvaModal;
