import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  Button,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
} from "react-native";
import ServiceCard from "../components/ServiceCard";

const Device = ({ route, navigation }) => {
  const [valueToBle, setValueToBle] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [services, setServices] = useState([]);

  // get the device object which was given through navigation params
  const { device } = route.params;

  const writeOnDevice = async (device, value) => {
    const service = "af493e2a-f002-11eb-9a03-0242ac130003";
    const characteristicTX = "af49423a-f002-11eb-9a03-0242ac130003";
    const characteristicRX = "af49414a-f002-11eb-9a03-0242ac130003";
    if (device) {
      try {
        device.monitorCharacteristicForService(
          service,
          characteristicTX,
          (error, characteristic) => {
            if (error) {
              console.log(error);
            } else {
              setCharacteristicValue(() => {
                return [
                  { id: "123", value: base64.decode(characteristic.value) },
                ];
              });
            }
          }
        );
        device.writeCharacteristicWithResponseForService(
          service,
          characteristicRX,
          base64.encode(value)
        );
        console.log("Writing to RX:", value);
      } catch (err) {
        console.log("deviceNotification catch error:", err);
      }
    }
  };

  // handle the device disconnection
  const disconnectDevice = useCallback(async () => {
    navigation.goBack();
    const isDeviceConnected = await device.isConnected();
    if (isDeviceConnected) {
      await device.cancelConnection();
    }
  }, [navigation]);

  useEffect(() => {
    const getDeviceInformations = () => {
      try {
        device
          .connect()
          .then((deviceA) => {
            setIsConnected(true);
            return deviceA.discoverAllServicesAndCharacteristics();
          })
          .then((allServices) => {
            allServices.services().then((myServices) => {
              setServices(myServices);
            });
          })
          .catch((error) => {
            navigation.goBack();
          });
      } catch (error) {
        console.error(error);
      }
    };
    getDeviceInformations();

    device.onDisconnected(() => {
      navigation.navigate("Home");
    });

    // give a callback to the useEffect to disconnect the device when we will leave the device screen
    return () => {
      disconnectDevice();
    };
  }, [device, disconnectDevice, navigation]);

  return (
    <>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.container}>
        <Button title="disconnect" onPress={disconnectDevice} />
        <View>
          <View style={styles.header}>
            <Text>{`Id : ${device.id}`}</Text>
            <Text>{`Name : ${device.name}`}</Text>
            <Text>{`Is connected : ${isConnected}`}</Text>
            <Text>{`RSSI : ${device.rssi}`}</Text>
            <Text>{`Manufacturer : ${device.manufacturerData}`}</Text>
            <Text>{`ServiceData : ${device.serviceData}`}</Text>
            <Text>{`UUIDS : ${device.serviceUUIDs}`}</Text>
          </View>
          {services.length > 0 && (
            <ServiceCard service={services[0]} key={services[0].id} />
          )}
        </View>
      </ScrollView>
      <TextInput
        onChangeText={(val) => setValueToBle(val)}
        style={{ backgroundColor: "yellow", height: 40 }}
      />
      <Button
        title="send to device"
        onPress={() => {
          writeOnDevice(device, valueToBle);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },

  header: {
    backgroundColor: "teal",
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: "rgba(60,64,67,0.3)",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
    padding: 12,
  },
});

export default Device;
