import React, { createContext, useState, useEffect } from "react";
import { BleManager } from "react-native-ble-plx";
import base64 from "react-native-base64";
import { LogBox } from "react-native";

export const BluetoothContext = createContext({});
export const BluetoothProvider = ({ children }) => {
  // LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
  // LogBox.ignoreAllLogs();

  const [chargeMessage, setChargeMessage] = useState([]);
  // const BlTManager = new BleManager();

  // const disconnectBluetooth = async () => {
  //   console.log("Disconnecting start");
  //   if (connectedDevice != null) {
  //     const isDeviceConnected = await connectedDevice.isConnected();
  //     if (isDeviceConnected) {
  //       BlTManager.cancelTransaction("messagetransaction");
  //       BlTManager.cancelTransaction("nightmodetransaction");

  //       BlTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
  //         console.log("DC completed")
  //       );
  //     }

  //     const connectionStatus = await connectedDevice.isConnected();
  //     if (!connectionStatus) {
  //       setIsConnected(false);
  //     }
  //   }
  // };

  //Function to send data to ESP32
  // async function sendBoxValue(value) {
  //   BLTManager.writeCharacteristicWithResponseForDevice(
  //     connectedDevice.id,
  //     SERVICE_UUID,
  //     BOX_UUID,
  //     base64.encode(value.toString())
  //   ).then((characteristic) => {
  //     console.log("Boxvalue changed to :", base64.decode(characteristic.value));
  //   });
  // }

  return (
    <BluetoothContext.Provider
      value={{
        setChargeMessage,
        chargeMessage,
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};
