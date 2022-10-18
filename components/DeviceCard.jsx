import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Base64 } from "../lib/base64";

const DeviceCard = ({ device }) => {
  // console.log(device);
  const navigation = useNavigation();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // is the device connected?
    device.isConnected().then(setIsConnected);
  }, [device]);

  return (
    <TouchableOpacity
      style={styles.container}
      // navigate to the Device Screen
      onPress={() => navigation.navigate("Device", { device })}
    >
      <Text>{`Id : ${device.id}`}</Text>
      <Text>{`Name : ${device.name}`}</Text>
      <Text>{`Is connected : ${isConnected}`}</Text>
      <Text>{`RSSI : ${device.rssi}`}</Text>
      {/* Decode the ble device manufacturer which is encoded with the base64 algorithm */}
      <Text>{`Manufacturer : ${Base64.decode(
        device.manufacturerData?.replace(/[=]/g, "")
      )}`}</Text>
      <Text>{`ServiceData : ${device.serviceData}`}</Text>
      <Text>{`UUIDS : ${device.serviceUUIDs}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: "rgba(60,64,67,0.3)",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
    padding: 12,
  },
});

export default DeviceCard;
