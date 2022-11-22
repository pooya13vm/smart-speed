// import React, { createContext, useState, useEffect } from "react";
// import { BleManager } from "react-native-ble-plx";
// import base64 from "react-native-base64";
// import { LogBox } from "react-native";

// export const BluetoothContext = createContext({});
// export const BluetoothProvider = ({ children }) => {
//   // LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
//   // LogBox.ignoreAllLogs();
//   const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
//   const MESSAGE_UUID = "6d68efe5-04b6-4a85-abc4-c2670b7bf7fd";
//   const BOX_UUID = "f27b53ad-c63d-49a0-8c0f-9f297e6cc520";
//   const [chargeMessage, setChargeMessage] = useState([]);
//   const [connectedDevice, setConnectedDevice] = useState();
//   const [message, setMessage] = useState();
//   const BLTManager = new BleManager();

//   // const disconnectBluetooth = async () => {
//   //   console.log("Disconnecting start");
//   //   if (connectedDevice != null) {
//   //     const isDeviceConnected = await connectedDevice.isConnected();
//   //     if (isDeviceConnected) {
//   //       BlTManager.cancelTransaction("messagetransaction");
//   //       BlTManager.cancelTransaction("nightmodetransaction");

//   //       BlTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
//   //         console.log("DC completed")
//   //       );
//   //     }

//   //     const connectionStatus = await connectedDevice.isConnected();
//   //     if (!connectionStatus) {
//   //       setIsConnected(false);
//   //     }
//   //   }
//   // };

//   // async function sendBoxValue(value) {
//   //   console.log("in sending value : ", connectedDevice.id);
//   //   BLTManager.writeCharacteristicWithResponseForDevice(
//   //     connectedDevice.id,
//   //     SERVICE_UUID,
//   //     BOX_UUID,
//   //     base64.encode(value.toString())
//   //   ).then((characteristic) => {
//   //     console.log(
//   //       "Box value changed to :",
//   //       base64.decode(characteristic.value)
//   //     );
//   //   });
//   // }

//   return (
//     <BluetoothContext.Provider
//       value={{
//         setChargeMessage,
//         chargeMessage,
//         BLTManager,
//         connectedDevice,
//         setConnectedDevice,
//         message,
//         setMessage,
//         // sendBoxValue,
//       }}
//     >
//       {children}
//     </BluetoothContext.Provider>
//   );
// };
