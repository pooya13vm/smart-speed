import React, { useState } from "react";
import {
  TouchableOpacity,
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

import base64 from "react-native-base64";

// import CheckBox from "@react-native-community/checkbox";
import { CheckBox } from "@rneui/themed";

import { BleManager } from "react-native-ble-plx";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const BLTManager = new BleManager();

const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";

const MESSAGE_UUID = "6d68efe5-04b6-4a85-abc4-c2670b7bf7fd";
const BOX_UUID = "f27b53ad-c63d-49a0-8c0f-9f297e6cc520";

function StringToBool(input) {
  if (input == "1") {
    return true;
  } else {
    return false;
  }
}

function BoolToString(input) {
  if (input == true) {
    return "1";
  } else {
    return "0";
  }
}
/// start ///----------------------------------------------------------->>>>>>
export default function SecondBLE() {
  //Is a device connected?
  const [isConnected, setIsConnected] = useState(false);

  //What device is connected?
  const [connectedDevice, setConnectedDevice] = useState();

  const [message, setMessage] = useState("Nothing Yet");
  const [boxvalue, setBoxValue] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Scans availbale BLT Devices and then call connectDevice
  async function scanDevices() {
    BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn(error);
      }

      if (scannedDevice && scannedDevice.name == "BLEExample") {
        BLTManager.stopDeviceScan();
        connectDevice(scannedDevice);
      }
    });

    // stop scanning devices after 5 seconds
    setTimeout(() => {
      BLTManager.stopDeviceScan();
    }, 5000);
  }

  // handle the device disconnection (poorly)
  async function disconnectDevice() {
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
      }
    }
  }

  //Function to send data to ESP32
  async function sendBoxValue(value) {
    BLTManager.writeCharacteristicWithResponseForDevice(
      connectedDevice.id,
      SERVICE_UUID,
      BOX_UUID,
      base64.encode(value.toString())
    ).then((characteristic) => {
      console.log("Boxvalue changed to :", base64.decode(characteristic.value));
    });
  }
  //Connect the device and start monitoring characteristics
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
        //  Set what to do when DC is detected
        BLTManager.onDeviceDisconnected(device.id, (error, device) => {
          console.log("Device DC");
          setIsConnected(false);
        });

        //Read inital values

        //Message
        device
          .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
          .then((valenc) => {
            setMessage(base64.decode(valenc.value));
          });

        //BoxValue
        device
          .readCharacteristicForService(SERVICE_UUID, BOX_UUID)
          .then((valenc) => {
            setBoxValue(StringToBool(base64.decode(valenc.value)));
          });

        //monitor values and tell what to do when receiving an update

        //Message
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          MESSAGE_UUID,
          (error, characteristic) => {
            if (characteristic.value != null) {
              setMessage(base64.decode(characteristic.value));
              console.log(
                "Message update received: ",
                base64.decode(characteristic.value)
              );
            }
          },
          "messagetransaction"
        );

        //BoxValue
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          BOX_UUID,
          (error, characteristic) => {
            if (characteristic.value != null) {
              setBoxValue(StringToBool(base64.decode(characteristic.value)));
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

  return (
    <View>
      <View style={{ paddingBottom: 200 }}></View>

      {/* Title */}
      <View style={styles.rowView}>
        <Text style={styles.titleText}>BLE Example</Text>
      </View>

      <View style={{ paddingBottom: 20 }}></View>

      {/* Connect Button */}
      <View style={styles.rowView}>
        <TouchableOpacity style={{ width: 120 }}>
          {!isConnected ? (
            <Button
              title="Connect"
              onPress={() => {
                scanDevices();
              }}
              disabled={false}
            />
          ) : (
            <Button
              title="Disonnect"
              onPress={() => {
                disconnectDevice();
              }}
              disabled={false}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={{ paddingBottom: 20 }}></View>

      {/* Monitored Value */}

      <View style={styles.rowView}>
        <Text style={styles.baseText}>{message}</Text>
      </View>

      <View style={{ paddingBottom: 20 }}></View>

      {/* Checkbox */}
      <View style={styles.rowView}>
        <CheckBox
          disabled={false}
          checked={boxvalue}
          onPress={() => {
            setBoxValue(!boxvalue);
            sendBoxValue("pooya");
          }}
        />
        <TextInput
          onChangeText={(val) => setInputValue(val)}
          style={{
            width: "50%",
            backgroundColor: "white",
            fontSize: 16,
            height: 40,
          }}
        />
        <Button title="send" onPress={() => sendBoxValue(inputValue)} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  baseText: {
    fontSize: 15,
    fontFamily: "Cochin",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rowView: {
    justifyContent: "space-around",
    alignItems: "flex-start",
    flexDirection: "row",
    padding: 10,
  },
});