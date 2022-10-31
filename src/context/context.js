import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid } from "react-native";

export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
  const [contact, setContact] = useState([]);
  const [isRegistered, setRegistered] = useState(false);
  const [parkur, setParkur] = useState([]);
  const [persons, setPersons] = useState([]);

  const checkStorage = async () => {
    try {
      const getST = await AsyncStorage.getItem("@contact");
      const parsST = JSON.parse(getST);
      if (parsST[0]) {
        setContact(parsST[0]);
        setRegistered(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // AsyncStorage.clear();

  const saveToStorage = async (contact) => {
    if (!isRegistered) {
      try {
        const stringified = await JSON.stringify(contact);
        await AsyncStorage.setItem("@contact", stringified);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
  return (
    <AppContext.Provider
      value={{
        getPermission,
        setContact,
        contact,
        checkStorage,
        saveToStorage,
        parkur,
        setParkur,
        persons,
        setPersons,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
