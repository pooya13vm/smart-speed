import React, { createContext, useState, useEffect } from "react";
import { BleManager } from "react-native-ble-plx";
import base64 from "react-native-base64";

export const BluetoothContext = createContext({});
export const BluetoothProvider = ({ children }) => {
  const BLTManager = new BleManager();
  const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
  const MESSAGE_UUID = "6d68efe5-04b6-4a85-abc4-c2670b7bf7fd";
  const BOX_UUID = "f27b53ad-c63d-49a0-8c0f-9f297e6cc520";

  const [isScanning, setScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState();
  const [boxvalue, setBoxValue] = useState();
  const [chargeData, setChargeData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [messageBLE, setMessageBLE] = useState();

  useEffect(() => {
    if (messageBLE) {
      if (chargeData.indexOf(messageBLE) === -1) {
        setChargeData([messageBLE, ...chargeData]);
        console.log("new data...");
      }
    }
  }, [messageBLE]);

  const scanDevices = async () => {
    BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn(error);
      }
      if (scannedDevice && scannedDevice.name == "BLEExample") {
        BLTManager.stopDeviceScan();
        connectDevice(scannedDevice);
        setScanning(false);
      }
    });
    setTimeout(() => {
      BLTManager.stopDeviceScan();
      setScanning(false);
    }, 5000);
  };

  const connectDevice = async (device) => {
    console.log("connecting to Device:", device.name);
    device
      .connect()
      .then((device) => {
        setConnectedDevice(device);
        setIsConnected(true);
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        //  Set what to do when DC is detected
        BLTManager.onDeviceDisconnected(device.id, (error, device) => {
          console.log("Device DC");
          setIsConnected(false);
        });
        //Read  values
        //Message
        device
          .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
          .then((val) => {
            setMessageBLE(base64.decode(val.value));
          });
        //BoxValue
        device
          .readCharacteristicForService(SERVICE_UUID, BOX_UUID)
          .then((val) => {
            setBoxValue(StringToBool(base64.decode(val.value)));
          });

        //monitor values and tell what to do when receiving an update

        //Message
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          MESSAGE_UUID,
          (error, characteristic) => {
            if (characteristic.value != null) {
              setMessageBLE(base64.decode(characteristic.value));
              console.log(
                "Message update received: ",
                base64.decode(characteristic.value)
              );
            }
          },
          "messagetransaction"
        );
        //BoxValue
        // device.monitorCharacteristicForService(
        //   SERVICE_UUID,
        //   BOX_UUID,
        //   (error, characteristic) => {
        //     if (characteristic.value != null) {
        //       setBoxValue(StringToBool(base64.decode(characteristic.value)));
        //       setChargeData([
        //         StringToBool(base64.decode(characteristic.value)),
        //         ...chargeData,
        //       ]);
        //       console.log(
        //         "Box Value update received: ",
        //         base64.decode(characteristic.value)
        //       );
        //     }
        //   },
        //   "boxtransaction"
        // );
        // console.log("Connection established");
      });
  };

  // handle the device disconnection (poorly)
  const disconnectBluetooth = async () => {
    console.log("Disconnecting start");
    if (connectedDevice != null) {
      const isDeviceConnected = await connectedDevice.isConnected();
      if (isDeviceConnected) {
        BLTManager.cancelTransaction("messagetransaction");
        BLTManager.cancelTransaction("nightmodetransaction");

        BLTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
          console.log("DC completed")
        );
      }

      const connectionStatus = await connectedDevice.isConnected();
      if (!connectionStatus) {
        setIsConnected(false);
        setModalVisible(false);
      }
    }
  };

  //Function to send data to ESP32
  async function sendBoxValue(value) {
    BLTManager.writeCharacteristicWithResponseForDevice(
      connectedDevice.id,
      SERVICE_UUID,
      BOX_UUID,
      base64.encode(value.toString())
    ).then((characteristic) => {
      console.log("Boxvalue changed to :", base64.decode(characteristic.value));
    });
  }

  return (
    <BluetoothContext.Provider
      value={{
        scanDevices,
        setScanning,
        disconnectBluetooth,
        isScanning,
        isConnected,
        sendBoxValue,
        messageBLE,
        chargeData,
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};
