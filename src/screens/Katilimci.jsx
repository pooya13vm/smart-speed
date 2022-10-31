import React, { useState, useContext } from "react";
import ScreenLayout from "../components/ScreenLayout";
import { TouchableOpacity, View, Text, Alert, FlatList } from "react-native";
import { Input } from "@rneui/base";
import { COLORS } from "../tools/colors";
import { AppContext } from "../context/context";
import uuid from "react-native-uuid";
import styled from "styled-components";
import Lottie from "lottie-react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const AnimationContainer = styled.View`
  width: 100%;
  height: 100%;
  padding: 30px;
  align-items: center;
  justify-content: space-between;
`;
const AnimationTitle = styled.Text`
  color: ${COLORS.darkBlue};
`;

const Katilimci = () => {
  //context
  const { persons, setPersons } = useContext(AppContext);
  //states
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  //handlers
  const addItemToList = () => {
    if (name === "") {
      Alert.alert("uyarı", "Lütfen Formdaki Tüm Girdileri Doldurun");
    } else {
      setLoading(true);
      const newPerson = { name, id: uuid.v4() };
      setPersons([...persons, newPerson]);
      setName("");
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const inputsStyle = {
    backgroundColor: "transparent",
    borderColor: COLORS.darkBlue,
    borderWidth: 1,
    width: "75%",
    borderRadius: 10,
    paddingHorizontal: 16,
  };
  return (
    <ScreenLayout title="Katılımcı Yönetimi">
      <View style={{ width: "90%", marginTop: 20 }}>
        <Input
          value={name}
          label="Katilimci Adı : *"
          style={inputsStyle}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          inputStyle={{
            color: COLORS.darkGreen,
          }}
          labelStyle={{
            marginBottom: 10,
            color: COLORS.darkBlue,
            marginLeft: 5,
          }}
          onChangeText={(val) => setName(val)}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "transparent",
          marginBottom: 30,
          marginRight: 15,
        }}
      >
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            padding: 10,
            borderRadius: 60,
            borderColor: COLORS.darkBlue,
          }}
          onPress={addItemToList}
        >
          <Text
            style={{ fontSize: 16, fontWeight: "bold", color: COLORS.darkBlue }}
          >
            Ekle
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "98%",
          height: "50%",
          borderWidth: 2,
          borderRadius: 30,
          borderColor: COLORS.darkBlue,
          paddingBottom: 10,
        }}
      >
        <Text
          style={{
            marginLeft: 20,
            marginTop: 10,
            fontSize: 17,
            fontWeight: "bold",
            color: COLORS.darkBlue,
          }}
        >
          Katılımcı Listesi :
        </Text>
        {!loading ? (
          <FlatList
            style={{ paddingHorizontal: 20, paddingVertical: 10 }}
            data={persons}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View
                style={{
                  width: "100%",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  marginVertical: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: COLORS.darkBlue,
                      marginRight: 8,
                    }}
                  >
                    {index + 1 + "_"}
                  </Text>
                  <Text style={{ fontSize: 16, color: COLORS.darkBlue }}>
                    {item.name}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    borderWidth: 0.5,
                    paddingVertical: 5,
                    paddingHorizontal: 6,
                    borderRadius: 50,
                  }}
                >
                  <Icon name="trash" size={16} color={COLORS.darkBlue} />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <AnimationContainer>
            <Lottie
              // progress={progress}
              style={{ flex: 1 }}
              source={require("../assets/images/lf30_editor_e33eotje.json")}
              autoPlay
              loop
            />
            <AnimationTitle>Kaydetmek için lütfen bekleyin</AnimationTitle>
          </AnimationContainer>
        )}
      </View>
    </ScreenLayout>
  );
};

export default Katilimci;
