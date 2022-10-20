import React from "react";
import ScreenLayout from "../components/ScreenLayout";

const Test = (props) => {
  return <ScreenLayout title={props.route.params.title}></ScreenLayout>;
};

export default Test;
