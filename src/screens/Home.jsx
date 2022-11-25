import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../context/context";
import Icon from "react-native-vector-icons/FontAwesome";
import { BleManager } from "react-native-ble-plx";
import base64 from "react-native-base64";
import { LogBox, Animated, Alert } from "react-native";

//components
import ScreenLayout from "../components/ScreenLayout";
import { COLORS } from "../tools/colors";
import { getPermission } from "../tools/getPermittion";
import BLConnectionModal from "../components/BLConnectionModal";
import TurnuvaOLModal from "../components/TurnuvaOLModal";
import WarningModal from "../components/WarningModal";

const BLTManager = new BleManager();

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const MESSAGE_UUID = "6d68efe5-04b6-4a85-abc4-c2670b7bf7fd";
const BOX_UUID = "f27b53ad-c63d-49a0-8c0f-9f297e6cc520";

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

const Home = ({ navigation }) => {
  //states
  const [isAllowed, setAllowed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [boxValue, setBoxValue] = useState();
  const [isScanning, setScanning] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState();
  const [TUmodalVisible, setTUmodalVisible] = useState(false);
  const [warningVisibility, setWarningVisibility] = useState(false);
  //context
  const {
    contact,
    saveToStorage,
    setChargeMessage,
    setMessage,
    parkur,
    persons,
    setRace,
  } = useContext(AppContext);

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
  }, [progress, isConnected, connectedDevice]);

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

  const scanDevices = async () => {
    BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
      console.log("start scanning ...");
      if (error) {
        console.warn(error);
      }

      if (scannedDevice && scannedDevice.name == "BLEExample") {
        BLTManager.stopDeviceScan();
        connectDevice(scannedDevice);
        setScanning(false);
      }
    });

    // stop scanning devices after 5 seconds
    setTimeout(() => {
      BLTManager.stopDeviceScan();
      setScanning(false);
    }, 5000);
  };
  async function connectDevice(device) {
    console.log("connecting to Device:", device.name);

    device
      .connect()
      .then((device) => {
        setConnectedDevice(device);
        setIsConnected(true);
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        BLTManager.onDeviceDisconnected(device.id, (error, device) => {
          console.log("Device DC");
          setIsConnected(false);
        });
        device
          .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
          .then((val) => {
            setMessage(base64.decode(val.value));
          });
        device
          .readCharacteristicForService(SERVICE_UUID, BOX_UUID)
          .then((value) => {
            setBoxValue(base64.decode(value.value));
          });
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          MESSAGE_UUID,
          (error, characteristic) => {
            if (characteristic.value != null) {
              if (base64.decode(characteristic.value).includes(":")) {
                setChargeMessage(base64.decode(characteristic.value));
                console.log(
                  "Message charge: ",
                  base64.decode(characteristic.value)
                );
              } else {
                console.log(
                  "Message turnuva: ",
                  base64.decode(characteristic.value)
                );
                setMessage(base64.decode(characteristic.value));
              }
            }
          },
          "messagetransaction"
        );

        device.monitorCharacteristicForService(
          SERVICE_UUID,
          BOX_UUID,
          (error, characteristic) => {
            if (characteristic.value != null) {
              setBoxValue(base64.decode(characteristic.value));
              console.log(
                "Box Value update received: ",
                base64.decode(characteristic.value)
              );
            }
          },
          "boxtransaction"
        );

        console.log("Connection established");
      });
  }

  async function disconnectBluetooth() {
    console.log("Disconnecting start");

    if (connectedDevice != null) {
      const isDeviceConnected = await connectedDevice.isConnected();
      if (isDeviceConnected) {
        BLTManager.cancelTransaction("messagetransaction");
        BLTManager.cancelTransaction("nightmodetransaction");
        BLTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
          console.log("DC completed")
        );
      }

      const connectionStatus = await connectedDevice.isConnected();
      if (!connectionStatus) {
        setIsConnected(false);
        connectedDevice.cancelConnection();
      }
    }
  }
  async function sendBoxValue(value) {
    console.log("in sending value : ", connectedDevice.id);
    BLTManager.writeCharacteristicWithResponseForDevice(
      connectedDevice.id,
      SERVICE_UUID,
      BOX_UUID,
      base64.encode(value.toString())
    ).then((characteristic) => {
      console.log(
        "Box value changed to :",
        base64.decode(characteristic.value)
      );
    });
  }
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
        <Button
          onPress={() => {
            if (isConnected) {
              setTUmodalVisible(true);
            } else {
              setWarningVisibility(true);
            }
          }}
        >
          <Icon name="flag-checkered" size={24} color={COLORS.darkBlue} />
          <ButtonText>Turnuva Oluştur</ButtonText>
        </Button>
        <Button
          onPress={() => {
            if (isConnected) {
              navigation.navigate("Sarj");
              sendBoxValue("charge");
            } else {
              setWarningVisibility(true);
            }
          }}
        >
          <Icon name="battery" size={24} color={COLORS.darkBlue} />
          <ButtonText>şarj kontrol</ButtonText>
        </Button>
        <Button onPress={connectingToDevice}>
          <Animated.View style={animationStyle}></Animated.View>
          <Icon name="bluetooth-b" size={24} color={COLORS.darkBlue} />
          <ButtonText>Bağlamak</ButtonText>
        </Button>
      </ButtonsContainer>
      <TurnuvaOLModal
        parkur={parkur}
        persons={persons}
        setRace={setRace}
        TUmodalVisible={TUmodalVisible}
        setTUmodalVisible={setTUmodalVisible}
        navigation={navigation}
        sendBoxValue={sendBoxValue}
      />
      <BLConnectionModal
        isConnected={isConnected}
        modalVisible={modalVisible}
        isScanning={isScanning}
        setModalVisible={setModalVisible}
        disconnectBluetooth={disconnectBluetooth}
      />
      <WarningModal
        setWarningVisibility={setWarningVisibility}
        warningVisibility={warningVisibility}
        title=" "
        note="Lütfen önce Bluetooth bağlantısını kurun."
      />
    </ScreenLayout>
  );
};

export default Home;
