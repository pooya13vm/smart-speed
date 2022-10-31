import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import { COLORS } from "../tools/colors";

const MultiSelectComponent = ({
  placeholder,
  onChangeSet,
  data2,
  selectedItems,
}) => {
  const [selected, setSelected] = useState([]);

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        iconColor={COLORS.darkGreen}
        containerStyle={{ marginTop: 5, borderRadius: 8 }}
        data={data2}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selected}
        onChange={(item) => {
          setSelected(item);
          selectedItems(item);
        }}
        selectedStyle={{
          borderRadius: 10,
          marginTop: 10,
          borderColor: COLORS.darkGreen,
        }}
        activeColor={COLORS.lightGreen}
        selectedTextStyle={{ fontSize: 14, color: COLORS.darkGreen }}
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    width: "110%",
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  placeholderStyle: {
    fontSize: 16,
    color: COLORS.darkGreen,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
