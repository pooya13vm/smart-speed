import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Modal, View, Text, TouchableOpacity } from "react-native";
// import styled from "styled-components";
import { Button } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../tools/colors";
import base64 from "react-native-base64";
import { BleManager } from "react-native-ble-plx";
import CircleButton from "./CircleButton";
import { displayTime } from "../tools/displayTime";
import Lottie from "lottie-react-native";

const BLTManager = new BleManager();

const BOX_UUID = "f27b53ad-c63d-49a0-8c0f-9f297e6cc520";
const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";

const TurnuvaModal = ({ visibility, setVisibility, item, setRace, race }) => {
  const [devices, setDevices] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const [time, setTime] = useState(0);
  const [message, setMessage] = useState("b");
  const [isReset, setReset] = useState(false);
  const timer = useRef(null);

  // console.log(item);
  // console.log(race);

  useEffect(() => {
    let myArray = [];
    for (let i = 0; i < +race.deviceNum; i++) {
      myArray.push(0);
    }
    setDevices(myArray);
  }, [isReset]);
  // console.log(devices);

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
  const HandleMiddleTime = useCallback(
    (num) => {
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
    },
    [isRunning, time]
  );

  const setChange = () => {
    if (message == "b") {
      start();
    } else {
      HandleMiddleTime(+message);
    }
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
      <Modal
        animationType="slide"
        visible={visibility}
        transparent={true}
        style={{ backgroundColor: "red", opacity: "" }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(23, 54, 68, 0.5)",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "90%",
              height: "90%",
              backgroundColor: "#fefefe",
              marginTop: "10%",
              borderRadius: 20,
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 6,
                paddingHorizontal: 10,
                backgroundColor: "#f4f4f4",
                borderRadius: 100,
                position: "absolute",
                right: 5,
                top: 2,
              }}
              onPress={() => {
                resetHandler();
                setVisibility(false);
              }}
            >
              <Text
                style={{
                  color: COLORS.darkBlue,
                }}
              >
                X
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 26,
                color: COLORS.darkBlue,
                marginVertical: 20,
                paddingHorizontal: 20,
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Text>
            <View
              style={{
                width: 200,
                height: 200,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.darkBlue,
                borderRadius: 120,
              }}
            >
              <Text style={{ fontSize: 28, color: "#fefefe" }}>
                {displayTime(time)}
              </Text>
            </View>

            <FlatList
              style={{
                marginBottom: 30,
                borderBottomWidth: 2,
                borderBottomColor: COLORS.darkBlue,
                width: "90%",
                paddingTop: 30,
                paddingBottom: 10,
                borderBottomWidth: 0,
              }}
              contentContainerStyle={{
                alignItems: "center",
                width: "90%",
                alignSelf: "center",
                position: "relative",
                // paddingVertical: 30,
              }}
              data={devices}
              keyExtractor={(item) => item.key}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    width: "50%",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexDirection: "row",
                    marginVertical: 10,
                  }}
                >
                  {displayTime(item) === "00:00:00" ? (
                    <>
                      <Icon
                        name="traffic-cone"
                        color={COLORS.darkBlue}
                        size={20}
                      />
                      <Text style={{ fontSize: 20, color: COLORS.darkBlue }}>
                        {displayTime(item)}
                      </Text>
                    </>
                  ) : (
                    <>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          alignItems: "center",
                        }}
                      >
                        <Lottie
                          style={{ flex: 1 }}
                          source={require("../assets/images/94242-flag-with-sparkle.json")}
                          autoPlay
                          loop={false}
                        />
                      </View>
                      <Text style={{ fontSize: 18 }}>{displayTime(item)}</Text>
                    </>
                  )}
                </View>
              )}
            />
            {!isFinished ? (
              <View style={{ marginBottom: 40 }}>
                <CircleButton title="Başlat" onPressFunction={setChange} />
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  width: "90%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <Button
                  title="Yeniden"
                  type="outline"
                  color={COLORS.darkBlue}
                  buttonStyle={{
                    borderWidth: 1,
                    borderColor: COLORS.darkBlue,
                    width: 100,
                    borderRadius: 10,
                  }}
                  titleStyle={{ color: COLORS.darkBlue }}
                  onPress={resetHandler}
                />
                <Button
                  title="Kurtar"
                  type="outline"
                  color={COLORS.darkBlue}
                  buttonStyle={{
                    borderWidth: 1,
                    borderColor: COLORS.darkBlue,
                    width: 100,
                    borderRadius: 10,
                  }}
                  titleStyle={{ color: COLORS.darkBlue }}
                  onPress={saveTimesToList}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  }
};

export default TurnuvaModal;
// useEffect(() => {
//   const sendBoxValue = async () => {
//     BLTManager.writeCharacteristicWithResponseForDevice(
//       connectedDevice.id,
//       SERVICE_UUID,
//       BOX_UUID,
//       base64.encode(selectedPerson.length.toString())
//     ).then((characteristic) => {
//       console.log(
//         "Boxvalue changed to :",
//         base64.decode(characteristic.value)
//       );
//     });
//   };
//   sendBoxValue();
// }, [selectedPerson]);
