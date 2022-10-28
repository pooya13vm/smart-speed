import React, { useState, useContext, useEffect } from "react";
import { Alert, ScrollView, View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, CheckBox, Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import { AppContext } from "../context/context";
//personal components
import BackGround from "../components/BackGround";
//personal tools
import { COLORS } from "../tools/colors";

const inputsStyle = {
  backgroundColor: "transparent",
  borderColor: COLORS.darkBlue,
  borderWidth: 1,
  width: "75%",
  borderRadius: 10,
  paddingHorizontal: 16,
};

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [checkedMan, setCheckedMan] = useState(false);
  const [checkedWoman, setCheckedWoman] = useState(false);

  const { setContact, contact, checkStorage } = useContext(AppContext);

  const saveContact = () => {
    if (alias === "") {
      Alert.alert("Lütfen boşluğu doldurun 'Kullanıcı adı'");
    } else {
      setContact([{ name, alias, sex: checkedMan ? "male" : "female" }]);
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    if (!contact.alias) {
      checkStorage();
    }
  }, []);

  if (!contact.alias) {
    return (
      <KeyboardAwareScrollView>
        <BackGround>
          <View
            style={{
              backgroundColor: "#fefefe",
              height: "75%",
              width: "80%",
              alignSelf: "center",
              marginTop: "35%",
              borderRadius: 30,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/images/Screen_Shot_2022-10-27_at_13.56.36-removebg.png")}
              style={{
                width: 120,
                height: 120,
                marginTop: -60,
                backgroundColor: "#fefefe",
                borderRadius: 70,
              }}
            />
            <ScrollView style={{ width: "100%" }}>
              <Input
                label="Ad ve soyad : "
                style={inputsStyle}
                inputStyle={{
                  color: COLORS.darkGreen,
                }}
                inputContainerStyle={{
                  borderBottomWidth: 0,
                }}
                labelStyle={{ marginBottom: 10, color: COLORS.darkBlue }}
                onChangeText={(val) => setName(val)}
              />
              <Input
                label="Kullanıcı adı : *"
                style={inputsStyle}
                inputContainerStyle={{
                  borderBottomWidth: 0,
                }}
                inputStyle={{
                  color: COLORS.darkGreen,
                }}
                labelStyle={{ marginBottom: 10, color: COLORS.darkBlue }}
                onChangeText={(val) => setAlias(val)}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  // marginVertical: 20,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: "gray",
                    // borderWidth: 1,
                    padding: 20,
                    borderRadius: 15,
                  }}
                >
                  <Icon
                    name="man"
                    type="ionicons"
                    size={42}
                    color={COLORS.darkBlue}
                  />
                  <CheckBox
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    uncheckedColor={COLORS.darkBlue}
                    containerStyle={{ backgroundColor: "transparent" }}
                    checked={checkedMan}
                    checkedColor={COLORS.darkGreen}
                    onPress={() => {
                      setCheckedMan(!checkedMan);
                      if (checkedWoman === true) setCheckedWoman(false);
                    }}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: "gray",
                    // borderWidth: 1,
                    padding: 20,
                    borderRadius: 15,
                  }}
                >
                  <Icon
                    name="woman-sharp"
                    type="ionicons"
                    size={42}
                    color={COLORS.darkBlue}
                  />
                  <CheckBox
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    containerStyle={{ backgroundColor: "transparent" }}
                    checked={checkedWoman}
                    uncheckedColor={COLORS.darkBlue}
                    checkedColor={COLORS.darkGreen}
                    onPress={() => {
                      setCheckedWoman(!checkedWoman);
                      if (checkedMan === true) setCheckedMan(false);
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  // marginTop: 20,
                }}
              >
                <Input
                  label="Ağırlık"
                  containerStyle={{
                    width: 120,
                    alignItems: "center",
                  }}
                  keyboardType="number-pad"
                  inputStyle={{
                    color: COLORS.darkGreen,
                    textAlign: "center",
                  }}
                  labelStyle={{
                    color: COLORS.darkBlue,
                    marginBottom: 5,
                  }}
                  inputContainerStyle={{
                    borderBottomWidth: 0,
                  }}
                  style={{ borderWidth: 1, borderRadius: 10 }}
                  placeholder="Kg"
                />

                <Input
                  label="Yükseklik"
                  containerStyle={{ width: 120, alignItems: "center" }}
                  keyboardType="number-pad"
                  inputStyle={{
                    color: COLORS.darkGreen,
                    textAlign: "center",
                  }}
                  labelStyle={{
                    color: COLORS.darkBlue,
                    marginBottom: 5,
                  }}
                  inputContainerStyle={{
                    borderBottomWidth: 0,
                  }}
                  style={{ borderWidth: 1, borderRadius: 10 }}
                  placeholder="Cm"
                />
              </View>
              <Button
                title="üye Ol"
                type="outline"
                buttonStyle={{
                  alignSelf: "center",
                  marginTop: "5%",
                  borderColor: COLORS.darkBlue,
                  borderWidth: 2,
                  borderRadius: 180,
                  width: 80,
                  padding: 25,
                }}
                titleStyle={{ color: COLORS.darkBlue, fontSize: 18 }}
                onPress={() => saveContact()}
              />
            </ScrollView>
          </View>
        </BackGround>
      </KeyboardAwareScrollView>
    );
  } else {
    return (
      <BackGround>
        <View style={{ alignItems: "center", marginTop: "10%" }}>
          <Image
            style={{ width: 220, height: 220, marginVertical: "10%" }}
            source={require("../assets/images/Screen_Shot_2022-10-27_at_13.56.36-removebg.png")}
          />
          <Text
            style={{
              fontSize: 38,
              fontWeight: "bold",
              color: COLORS.darkBlue,
              marginTop: "15%",
            }}
          >
            Hoşgeldiniz
          </Text>
          <Text
            style={{
              fontSize: 24,
              marginTop: 20,
              color: COLORS.darkBlue,
              borderBottomWidth: 2,
              borderBottomColor: COLORS.darkBlue,
              padding: 10,
            }}
          >{`${contact.name} ${
            contact.sex === "male" ? "Bey" : "Hanım"
          }`}</Text>

          <Button
            title="Giriş yapmak"
            type="outline"
            buttonStyle={{
              marginTop: "40%",
              borderColor: COLORS.darkBlue,
              borderWidth: 2,
              borderRadius: 10,
            }}
            titleStyle={{ color: COLORS.darkBlue, fontSize: 18 }}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </BackGround>
    );
  }
};

export default Register;
