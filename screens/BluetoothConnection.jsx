import React from "react";
import { BleManager, Device } from "react-native-ble-plx";
import { View, Text } from "react-native";

import ScreenLayout from "../components/ScreenLayout";
console.log(Device);
console.log(BleManager);

const manager = new BleManager();

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_DEVICE":
//       const { payload: device } = action;

//       // check if the detected device is not already added to the list
//       if (device && !state.find((dev) => dev.id === device.id)) {
//         return [...state, device];
//       }
//       return state;
//     case "CLEAR":
//       return [];
//     default:
//       return state;
//   }
// };

const BluetoothConnection = () => {
  return <ScreenLayout title="Bluetooth Connection"></ScreenLayout>;
};

export default BluetoothConnection;
