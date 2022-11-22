import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "./src/context/context";
import AppNavigation from "./src/navigation/AppNavigation";

const App = () => {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppNavigation />
      </AppProvider>
    </SafeAreaProvider>
  );
};
export default App;
