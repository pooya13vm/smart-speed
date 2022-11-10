import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../context/context";
import Icon from "react-native-vector-icons/FontAwesome";
import { BleManager } from "react-native-ble-plx";
import Lottie from "lottie-react-native";
import { LogBox, Animated, Modal, View, Alert } from "react-native";

//components
import ScreenLayout from "../components/ScreenLayout";
import { COLORS } from "../tools/colors";
import { getPermission } from "../tools/getPermittion";
import { BluetoothContext } from "../context/bluetooth";
import RectangleButton from "../components/RectangleButton";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const BLTManager = new BleManager();

const ButtonsContainer = styled.View`
  width: 80%;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  padding-vertical: 10%;
`;
const Button = styled.TouchableOpacity`
  shadow-color: ${COLORS.lightBlue};
  shadow-offset: 0px 10px;
  shadow-opacity: 0.23;
  shadow-radius: 11.27px;
  elevation: 14;
  width: 120px;
  height: 120px;
  justify-content: center;
  background-color: #fefefe;
  align-items: center;
  margin: 15px auto;
  border-radius: 15px;
  padding: 10px;
`;
const ButtonText = styled.Text`
  color: ${COLORS.darkBlue};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
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

const Home = ({ navigation }) => {
  //states
  const [isAllowed, setAllowed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  //context
  const { contact, saveToStorage } = useContext(AppContext);
  const {
    setScanning,
    scanDevices,
    disconnectBluetooth,
    isScanning,
    isConnected,
  } = useContext(BluetoothContext);

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.delay(50),
        Animated.timing(progress, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.delay(50),
      ])
    ).start();
    //turning on device Bluetooth
    BLTManager.state().then((val) => {
      if (val !== "PoweredOn") {
        BLTManager.enable().then(() => console.log("bluetooth is turned on"));
      }
    });
    getPermission().then((result) => setAllowed(result));
    saveToStorage(contact);
  }, [progress, isConnected]);

  //handlers
  const connectingToDevice = () => {
    if (isAllowed) {
      setModalVisible(true);
      if (!isConnected) {
        setScanning(true);
        scanDevices();
      }
    } else {
      return Alert.alert("Lütfen ayarlarda Bluetooth erişimine izin verin");
    }
  };

  const animationStyle = {
    width: 8,
    height: 8,
    backgroundColor: isConnected ? "#34B3F1" : "#EB1D36",
    position: "absolute",
    top: 15,
    right: 15,
    borderRadius: 10,
    opacity: progress,
    transform: [{ scale: progress }],
  };

  return (
    <ScreenLayout>
      <ButtonsContainer>
        <Button onPress={() => navigation.navigate("Parkur")}>
          <Icon name="road" size={24} color={COLORS.darkBlue} />
          <ButtonText>Parkur Oluştur</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate("Katilimci")}>
          <Icon name="users" size={24} color={COLORS.darkBlue} />
          <ButtonText>Katılımcı Yönetimi</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate("Gecmis")}>
          <Icon name="history" size={24} color={COLORS.darkBlue} />
          <ButtonText>Geçmiş Turnuvalar</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate("TurnuvaBA")}>
          <Icon name="flag-checkered" size={24} color={COLORS.darkBlue} />
          <ButtonText>Turnuva Oluştur</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate("Sarj")}>
          <Icon name="battery" size={24} color={COLORS.darkBlue} />
          <ButtonText>şarj kontrol</ButtonText>
        </Button>
        <Button onPress={connectingToDevice}>
          <Animated.View style={animationStyle}></Animated.View>
          <Icon name="bluetooth-b" size={24} color={COLORS.darkBlue} />
          <ButtonText>Bağlamak</ButtonText>
        </Button>
      </ButtonsContainer>
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
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: "5%",
            }}
          >
            {isConnected && !isScanning && (
              <RectangleButton
                onPress={() => {
                  modalVisible(false);
                  disconnectBluetooth;
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
    </ScreenLayout>
  );
};

export default Home;

//from app context :
// chargeData,
// setChargeData,
// isConnected,
// setIsConnected,
// connectedDevice,
// setConnectedDevice,

// const [message, setMessage] = useState(); //*
// const [boxvalue, setBoxValue] = useState(); //*
// const [isScanning, setScanning] = useState(false); //*

// const scanDevices = async () => {
//   BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
//     if (error) {
//       console.warn(error);
//     }
//     if (scannedDevice && scannedDevice.name == "BLEExample") {
//       BLTManager.stopDeviceScan();
//       connectDevice(scannedDevice);
//       setScanning(false);
//     }
//   });
//   setTimeout(() => {
//     BLTManager.stopDeviceScan();
//     setScanning(false);
//   }, 5000);
// };

// const connectDevice = async (device) => {
//   console.log("connecting to Device:", device.name);
//   device
//     .connect()
//     .then((device) => {
//       setConnectedDevice(device);
//       setIsConnected(true);
//       return device.discoverAllServicesAndCharacteristics();
//     })
//     .then((device) => {
//       //  Set what to do when DC is detected
//       BLTManager.onDeviceDisconnected(device.id, (error, device) => {
//         console.log("Device DC");
//         setIsConnected(false);
//       });
//       //Read  values
//       //Message
//       device
//         .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
//         .then((val) => {
//           setMessage(base64.decode(val.value));
//         });
//       //BoxValue
//       device
//         .readCharacteristicForService(SERVICE_UUID, BOX_UUID)
//         .then((val) => {
//           setBoxValue(StringToBool(base64.decode(val.value)));
//         });

//       //monitor values and tell what to do when receiving an update

//       //Message
//       device.monitorCharacteristicForService(
//         SERVICE_UUID,
//         MESSAGE_UUID,
//         (error, characteristic) => {
//           if (characteristic.value != null) {
//             setMessage(base64.decode(characteristic.value));
//             console.log(
//               "Message update received: ",
//               base64.decode(characteristic.value)
//             );
//           }
//         },
//         "messagetransaction"
//       );
//       //BoxValue
//       // device.monitorCharacteristicForService(
//       //   SERVICE_UUID,
//       //   BOX_UUID,
//       //   (error, characteristic) => {
//       //     if (characteristic.value != null) {
//       //       setBoxValue(StringToBool(base64.decode(characteristic.value)));
//       //       setChargeData([
//       //         StringToBool(base64.decode(characteristic.value)),
//       //         ...chargeData,
//       //       ]);
//       //       console.log(
//       //         "Box Value update received: ",
//       //         base64.decode(characteristic.value)
//       //       );
//       //     }
//       //   },
//       //   "boxtransaction"
//       // );
//       // console.log("Connection established");
//     });
// };

// handle the device disconnection (poorly)
// const disconnectBluetooth = async () => {
//   console.log("Disconnecting start");
//   if (connectedDevice != null) {
//     const isDeviceConnected = await connectedDevice.isConnected();
//     if (isDeviceConnected) {
//       BLTManager.cancelTransaction("messagetransaction");
//       BLTManager.cancelTransaction("nightmodetransaction");

//       BLTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
//         console.log("DC completed")
//       );
//     }

//     const connectionStatus = await connectedDevice.isConnected();
//     if (!connectionStatus) {
//       setIsConnected(false);
//       setModalVisible(false);
//     }
//   }
// };
// useEffect(() => {
//   if (message) {
//     if (chargeData.indexOf(message) === -1) {
//       setChargeData([message, ...chargeData]);
//       console.log("new data...");
//     }
//   }
// }, [message]);
