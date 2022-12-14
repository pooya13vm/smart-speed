import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../context/context";
import Icon from "react-native-vector-icons/FontAwesome";
import { BleManager } from "react-native-ble-plx";
import base64 from "react-native-base64";
import { LogBox, Animated } from "react-native";
import { PERMISSIONS } from "react-native-permissions";

//components
import ScreenLayout from "../components/ScreenLayout";
import { COLORS } from "../tools/colors";
import BLConnectionModal from "../components/BLConnectionModal";
import TurnuvaOLModal from "../components/TurnuvaOLModal";
import WarningModal from "../components/WarningModal";

const BLTManager = new BleManager();

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
// const SERVICE_UUID = "0000FFE0-0000-1000-8000-00805F9B34FB";
const MESSAGE_UUID = "6d68efe5-04b6-4a85-abc4-c2670b7bf7fd";
// const MESSAGE_UUID = "0000FFE1-0000-1000-8000-00805F9B34FB";
const BOX_UUID = "f27b53ad-c63d-49a0-8c0f-9f297e6cc520";
// const BOX_UUID = "0000FFE1-0000-1000-8000-00805F9B34FB";

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

export const sendBoxValue = async (value, id) => {
  console.log("in sending value : ", id);
  BLTManager.writeCharacteristicWithResponseForDevice(
    id,
    SERVICE_UUID,
    BOX_UUID,
    base64.encode(value.toString())
  ).then((characteristic) => {
    console.log("Box value changed to :", base64.decode(characteristic.value));
  });
};

const Home = ({ navigation }) => {
  //states
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
    setConnectedDeviceId,
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
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE;
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT;
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN;
    BLTManager.state().then((val) => {
      if (val !== "PoweredOn") {
        BLTManager.enable().then(() => console.log("bluetooth is turned on"));
      }
    });
    saveToStorage(contact[0]);
  }, [progress, isConnected, connectedDevice]);

  //handlers
  const connectingToDevice = () => {
    setModalVisible(true);
    if (!isConnected) {
      setScanning(true);
      scanDevices();
    }
  };

  const scanDevices = async () => {
    BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
      console.log("start scanning ...");
      if (error) {
        console.warn(error);
      }
      if (scannedDevice) {
        if (
          scannedDevice.name == "BT05" ||
          scannedDevice.name == "MLT-BT05" ||
          scannedDevice.name == "BLEExample"
        ) {
          BLTManager.stopDeviceScan();
          connectDevice(scannedDevice);
          setScanning(false);
        }
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
              setConnectedDeviceId(connectedDevice.id);
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
              sendBoxValue("c", connectedDevice.id);
            } else {
              setWarningVisibility(true);
            }
          }}
        >
          <Icon name="battery" size={24} color={COLORS.darkBlue} />
          <ButtonText>Şarj Kontrol</ButtonText>
        </Button>
        <Button onPress={connectingToDevice}>
          <Animated.View style={animationStyle}></Animated.View>
          <Icon name="bluetooth-b" size={24} color={COLORS.darkBlue} />
          <ButtonText>Bağlan</ButtonText>
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
        id={connectedDevice ? connectedDevice.id : null}
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
