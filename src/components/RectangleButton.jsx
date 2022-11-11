import React from "react";
import { Button } from "@rneui/base";
import { COLORS } from "../tools/colors";

const RectangleButton = ({ title, onPress }) => {
  return (
    <>
      <Button
        title={title}
        onPress={onPress}
        type="outline"
        buttonStyle={{ borderWidth: 0 }}
        containerStyle={{
          width: 120,
          borderWidth: 1,
          borderColor: COLORS.darkBlue,
          borderRadius: 10,
        }}
        titleStyle={{ color: COLORS.darkBlue }}
      />
    </>
  );
};

export default RectangleButton;
