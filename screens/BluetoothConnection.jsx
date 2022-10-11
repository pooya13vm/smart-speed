import React, { useState, useReducer } from "react";
import { BleManager, Device } from "react-native-ble-plx";
import { View, Text, Button } from "react-native";

import ScreenLayout from "../components/ScreenLayout";
console.log(Device);
console.log(BleManager);

const manager = new BleManager();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DEVICE":
      const { payload: device } = action;

      // check if the detected device is not already added to the list
      if (device && !state.find((dev) => dev.id === device.id)) {
        return [...state, device];
      }
      return state;
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

const BluetoothConnection = () => {
  const [scannedDevices, dispatch] = useReducer(reducer, []);
  const [isLoading, setIsLoading] = useState(false);

  const scanDevices = () => {
    // display the Activityindicator
    setIsLoading(true);

    // scan devices
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn(error);
      }

      // if a device is detected add the device to the list by dispatching the action into the reducer
      if (scannedDevice) {
        dispatch({ type: "ADD_DEVICE", payload: scannedDevice });
      }
    });

    // stop scanning devices after 5 seconds
    setTimeout(() => {
      manager.stopDeviceScan();
      setIsLoading(false);
    }, 5000);
  };

  return (
    <ScreenLayout title="Bluetooth Connection">
      <Button
        title="Clear devices"
        onPress={() => dispatch({ type: "CLEAR" })}
      />
      {isLoading ? (
        <ActivityIndicator color={"teal"} size={25} />
      ) : (
        <Button title="Scan devices" onPress={scanDevices} />
      )}
    </ScreenLayout>
  );
};

export default BluetoothConnection;
