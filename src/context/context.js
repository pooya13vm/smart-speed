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
  const [chargeMessage, setChargeMessage] = useState([]);
  const [message, setMessage] = useState(null);

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
  // console.log(parkur);
  const saveRace = () => {
    if (race.name) {
      setAllRaces([...allRaces, race]);
      saveAllRacesToStorage([...allRaces, race]);
    }
  };

  const ctx = React.useMemo(
    () => ({
      race,
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
      setChargeMessage,
      chargeMessage,
      message,
      setMessage,
    }),
    [race, contact, parkur, persons, allRaces, chargeMessage, message]
  );

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};
