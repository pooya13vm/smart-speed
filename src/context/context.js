import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
  const [contact, setContact] = useState([]);
  const [isRegistered, setRegistered] = useState(false);
  const [parkur, setParkur] = useState([]);
  const [persons, setPersons] = useState([]);
  const [race, setRace] = useState({});
  const [allRaces, setAllRaces] = useState([]);
  const [chargeData, setChargeData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState();

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
    try {
      const getST = await AsyncStorage.getItem("@parkur");
      const parsST = JSON.parse(getST);
      if (parsST) {
        setParkur(parsST);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const getST = await AsyncStorage.getItem("@katilimci");
      const parsST = JSON.parse(getST);
      if (parsST) {
        setPersons(parsST);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const getST = await AsyncStorage.getItem("@turnuva");
      const parsST = JSON.parse(getST);
      if (parsST) {
        setAllRaces(parsST);
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
  const saveAllRacesToStorage = async (turnuva) => {
    try {
      const stringified = await JSON.stringify(turnuva);
      await AsyncStorage.setItem("@turnuva", stringified);
    } catch (error) {
      console.log(error);
    }
  };
  const saveRace = () => {
    if (race.name) {
      setAllRaces([...allRaces, race]);
      saveAllRacesToStorage([...allRaces, race]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        // getPermission,
        setContact,
        contact,
        checkStorage,
        saveToStorage,
        parkur,
        setParkur,
        persons,
        setPersons,
        setRace,
        saveRace,
        allRaces,
        setAllRaces,
        saveAllRacesToStorage,
        chargeData,
        setChargeData,
        isConnected,
        setIsConnected,
        connectedDevice,
        setConnectedDevice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
