import React, { useState } from "react";
import ScreenLayout from "../components/ScreenLayout";
import DropdownComponent from "../components/Dropdown";
import MultiSelectComponent from "../components/MultiSelectDD";
import { View, Modal, Text, FlatList, TouchableOpacity } from "react-native";
import { Button } from "@rneui/base";
import { COLORS } from "../tools/colors";
import CircleButton from "../components/CircleButton";

const data = [
  { label: "Yol turnuvs", value: "Yol turnuvs" },
  { label: "Item 2", value: "2" },
];
const data2 = [
  { label: "Item 1", value: "jafar" },
  { label: "Item 2", value: "hasan" },
  { label: "Item 3", value: "omar" },
  { label: "Item 4", value: "gholi" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];
const TurnuvaBA = () => {
  const [selectedTurnuva, setSelectedTurnuva] = useState("");
  const [selectedPerson, setSelectedPerson] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScreenLayout title="Turnuva Başlat">
      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          height: "75%",
          alignItems: "center",
        }}
      >
        <View style={{ width: "90%", marginTop: 20 }}>
          <DropdownComponent
            data={data}
            onChangeSet={setSelectedTurnuva}
            placeholder="Turnuva Seç"
          />
          <MultiSelectComponent
            data2={data2}
            selectedItems={setSelectedPerson}
            placeholder="Katilimcilar Seç"
          />
        </View>
        <CircleButton title="Başlat" onPressFunction={setModalVisible} />
      </View>

      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <View
          style={{
            width: "90%",
            height: "90%",
            backgroundColor: "white",
            alignSelf: "center",
            marginTop: "10%",
            borderRadius: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginTop: 30,
              fontSize: 24,
              fontWeight: "bold",
              color: COLORS.darkBlue,
            }}
          >
            {selectedTurnuva}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
              borderBottomWidth: 2,
              paddingHorizontal: 10,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: COLORS.darkBlue,
              }}
            >
              Sira
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: COLORS.darkBlue,
              }}
            >
              Katilimci
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: COLORS.darkBlue,
              }}
            >
              Sure
            </Text>
          </View>

          <FlatList
            style={{
              marginBottom: 30,
              borderBottomWidth: 2,
              borderBottomColor: COLORS.darkBlue,
            }}
            data={selectedPerson}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  width: "90%",
                  paddingHorizontal: 10,
                  marginTop: 10,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.darkBlue,
                    width: 30,
                    marginRight: "10%",
                    // textAlign: "center",
                  }}
                >
                  {index + 1}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.darkBlue,
                    width: 100,
                    marginLeft: "10%",
                    textAlign: "center",
                  }}
                >
                  {item}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.darkBlue,
                    width: 70,
                    marginLeft: "20%",

                    textAlign: "center",
                  }}
                >
                  00:00
                </Text>
              </View>
            )}
          />

          <View
            style={{
              flexDirection: "row",

              width: "90%",
              alignSelf: "center",
              justifyContent: "space-around",
              marginBottom: 30,
            }}
          >
            <Button
              title="Iptal"
              onPress={() => setModalVisible(false)}
              type="outline"
              containerStyle={{
                width: 120,
                borderWidth: 1,
                borderColor: COLORS.darkBlue,
                borderRadius: 10,
              }}
              titleStyle={{ color: COLORS.darkBlue }}
            />
            <Button
              title="Bitiş"
              type="outline"
              containerStyle={{
                width: 120,
                borderWidth: 1,
                borderColor: COLORS.darkBlue,
                borderRadius: 10,
              }}
              titleStyle={{ color: COLORS.darkBlue }}
            />
          </View>
        </View>
      </Modal>
    </ScreenLayout>
  );
};

export default TurnuvaBA;
