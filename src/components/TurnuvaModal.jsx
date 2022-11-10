import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "react-native";
import styled from "styled-components";

//personal component
import { COLORS } from "../tools/colors";
import CircleButton from "./CircleButton";
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
  sendBoxValue,
  messageBLE,
}) => {
  const [devices, setDevices] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const [time, setTime] = useState(0);
  const [message, setMessage] = useState("b");
  const [isReset, setReset] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    let myArray = [];
    for (let i = 0; i < +race.deviceNum; i++) {
      myArray.push(0);
    }
    setDevices(myArray);
  }, [isReset]);

  //handlers
  const start = useCallback(() => {
    if (!isRunning && !isFinished) {
      console.log("in start ...");
      setMessage(-1); //just for test it must come from device
      const interval = setInterval(() => {
        setTime((previousTime) => previousTime + 1);
      }, 10);
      timer.current = interval;
    } else {
      console.log("in stop ...");
      clearInterval(timer.current);
    }
    setIsRunning((pre) => !pre);
  }, [isRunning]);

  const HandleMiddleTime = useCallback(() => {
    setMessage((pre) => pre + 1); //for test
    // console.log("m : ", message);
    // if (num < +race.deviceNum) {
    if (+message < +race.deviceNum) {
      if (isRunning) {
        const copy = [...devices];
        // copy[num] = time;
        copy[message] = time;
        setDevices(copy);
        // if (num === +race.deviceNum - 1) {
        if (+message === +race.deviceNum - 1) {
          console.log("in else....");
          setFinished(true);
          start();
        }
      }
    } else {
      console.log("in else....");
      setFinished(true);
      start();
    }
    console.log(devices);
  }, [isRunning, time, messageBLE]);

  const setChange = () => {
    if (message == "b") {
      start();
    } else {
      HandleMiddleTime(+message);
    }
    // sendBoxValue(devices.length);
    // start();
  };
  const resetHandler = () => {
    if (isFinished) {
      setDevices([]);
      setTime(0);
      setIsRunning(false);
      setFinished(false);
      setMessage("b");
      setReset(!isReset);
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
    setMessage("b");
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
            <TurnuvaTimeFlatList devices={devices} />
            {!isFinished ? (
              <ButtonContainer>
                <CircleButton title="Başlat" onPressFunction={setChange} />
              </ButtonContainer>
            ) : (
              <ButtonContainer>
                <RectangleButton title="Yeniden" onPress={resetHandler} />
                <RectangleButton title="Kurtar" onPress={saveTimesToList} />
              </ButtonContainer>
            )}
          </ModalContainer>
        </ModalBackground>
      </Modal>
    );
  }
};

export default TurnuvaModal;
