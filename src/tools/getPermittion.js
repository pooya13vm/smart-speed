import { PermissionsAndroid } from "react-native";

export const getPermission = async () => {
  try {
    // const granted5 = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    //   {
    //     title: "Location permission for bluetooth scanning",
    //     message: "Smart speed need to use bluetooth",
    //     buttonNeutral: "Ask Me Later",
    //     buttonNegative: "Cancel",
    //     buttonPositive: "OK",
    //   }
    // );

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
    if (
      granted === PermissionsAndroid.RESULTS.GRANTED &&
      granted2 === PermissionsAndroid.RESULTS.GRANTED &&
      granted3 === PermissionsAndroid.RESULTS.GRANTED &&
      granted4 === PermissionsAndroid.RESULTS.GRANTED
      // granted5 === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log("Location permission for bluetooth scanning granted");
      //   setAllowed(true);
      return true;
    } else {
      console.log("Location permission for bluetooth scanning revoked");
      //   setAllowed(false);
      return false;
    }
  } catch (err) {
    console.warn(err);
    // setAllowed(false);
    return false;
  }
};
