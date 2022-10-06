import React from "react";
import { View, Text } from "react-native";
import ScreenLayout from "../components/ScreenLayout";

const Test = (props) => {
  return <ScreenLayout title={props.route.params.title}></ScreenLayout>;
};

export default Test;
