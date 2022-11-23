// module.exports =
//   expo: plugins: [
//     [
//       "@config-plugins/react-native-ble-plx",
//       {
//         isBackgroundEnabled: true,
//         modes: ["peripheral", "central"],
//         bluetoothAlwaysPermission:
//           "Allow $(PRODUCT_NAME) to connect to bluetooth devices",
//         bluetoothPeripheralPermission:
//           "Allow $(PRODUCT_NAME) to connect to bluetooth devices",
//       },
//     ],
//   ];
// {
//     "expo": {
//       "extra": {
//         "eas": {
//           "projectId": "d0bc4ba4-e911-4605-aad8-cd7ed27c15ac"
//         }
//       }
//     }
//   }
module.exports = {
  name: "smartSpeed",
  version: "1.0.0",

  extra: {
    eas: {
      projectId: "d0bc4ba4-e911-4605-aad8-cd7ed27c15ac",
    },
  },
};
