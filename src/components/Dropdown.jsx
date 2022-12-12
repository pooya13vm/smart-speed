import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { COLORS } from "../tools/colors";
import { View, Text } from "react-native";

const DropdownComponent = ({
  data,
  onChangeSet,
  placeholder,
  search = false,
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const renderItem = (item) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ color: COLORS.darkBlue, fontSize: 18 }}>
          {item.label}
        </Text>
      </View>
    );
  };
  return (
    <Dropdown
      data={data}
      value={value}
      style={{
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: COLORS.darkBlue,
        height: 40,
      }}
      containerStyle={{
        borderRadius: 8,
        marginTop: 5,
      }}
      autoScroll
      placeholder={!isFocus ? placeholder : "..."}
      iconColor={COLORS.darkGreen}
      labelField="label"
      valueField="value"
      search={search}
      maxHeight={300}
      placeholderStyle={{ fontSize: 16, color: COLORS.darkGreen }}
      selectedTextStyle={{ fontSize: 16, color: COLORS.darkGreen }}
      showsVerticalScrollIndicator={true}
      renderItem={renderItem}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      activeColor={COLORS.lightBlue}
      onChange={(item) => {
        onChangeSet(item.value);
        setValue(item.value);
        setIsFocus(false);
      }}
    />
  );
};
export default DropdownComponent;
