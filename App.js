import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "./src/context/context";
import AppNavigation from "./src/navigation/AppNavigation";
import { BluetoothProvider } from "./src/context/bluetooth";

const App = () => {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <BluetoothProvider>
          <AppNavigation />
        </BluetoothProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
};
export default App;
