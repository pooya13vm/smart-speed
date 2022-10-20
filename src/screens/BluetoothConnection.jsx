import React, { useState, useReducer, useEffect } from "react";
import { BleManager } from "react-native-ble-plx";
import {
  Button,
  ActivityIndicator,
  FlatList,
  PermissionsAndroid,
} from "react-native";

import ScreenLayout from "../components/ScreenLayout";
import DeviceCard from "../components/DeviceCard";

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
  const [isAllowed, setAllowed] = useState(false);

  useEffect(() => {
    manager.state().then((val) => {
      if (val !== "PoweredOn") {
        manager.enable().then(() => console.log("bluetooth is turned on"));
      }
    });
    const getPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          {
            title: "Location permission for bluetooth scanning",
            message: "Smart speed need to use bluetooth",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        const granted2 = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          {
            title: "Location permission for bluetooth scanning",
            message: "Smart speed need to use bluetooth",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        const granted3 = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
          {
            title: "Location permission for bluetooth scanning",
            message: "Smart speed need to use bluetooth",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        const granted4 = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location permission for bluetooth scanning",
            message: "Smart speed need to use bluetooth",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (
          granted === PermissionsAndroid.RESULTS.GRANTED &&
          granted2 === PermissionsAndroid.RESULTS.GRANTED &&
          granted3 === PermissionsAndroid.RESULTS.GRANTED &&
          granted4 === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log("Location permission for bluetooth scanning granted");
          setAllowed(true);
        } else {
          console.log("Location permission for bluetooth scanning revoked");
          setAllowed(false);
        }
      } catch (err) {
        console.warn(err);
        setAllowed(false);
      }
    };
    getPermission();
  }, []);

  const scanDevices = () => {
    // display the Activityindicator
    setIsLoading(true);

    // scan devices
    if (isAllowed) {
      manager.startDeviceScan(null, null, (error, scannedDevice) => {
        if (error) {
          console.warn(error);
        }

        // if a device is detected add the device to the list by dispatching the action into the reducer
        if (scannedDevice) {
          dispatch({ type: "ADD_DEVICE", payload: scannedDevice });
        }
      });
    }
    // stop scanning devices after 5 seconds
    setTimeout(() => {
      manager.stopDeviceScan();
      setIsLoading(false);
    }, 5000);
  };
  let activeDevices = scannedDevices.filter((item) => item.name !== null);
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
      <FlatList
        keyExtractor={(item) => item.id}
        data={activeDevices}
        renderItem={({ item }) => <DeviceCard device={item} />}
      />
    </ScreenLayout>
  );
};

export default BluetoothConnection;
