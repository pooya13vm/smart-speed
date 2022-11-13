import React, { useState, useContext, useEffect } from "react";
import { Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, CheckBox, Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components";

//personal components
import BackGround from "../components/BackGround";
import { AppContext } from "../context/context";
import { COLORS } from "../tools/colors";
import CircleButton from "../components/CircleButton";

//styled components
const Container = styled.View`
  background-color: #fefefe;
  height: 75%;
  width: 90%;
  align-self: center;
  margin-top: 35%;
  border-radius: 30px;
  align-items: center;
`;
const ImageComponent = styled.Image`
  width: 120px;
  height: 120px;
  margin-top: -60px;
  background-color: #fefefe;
  border-radius: 70px;
`;
const BodyContainer = styled.ScrollView`
  width: 90%;
`;
const SexSelectContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;
const CheckboxContainer = styled.View`
  justify-content: center;
  align-items: center;
  border-color: gray;
  padding: 20px;
  border-radius: 15px;
`;
const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
const SPContainer = styled.View`
  align-items: center;
  margin-top: 10%;
`;
const SPimageComponent = styled.Image`
  width: 220px;
  height: 220px;
  margin-vertical: 10%;
`;
const SPTitleText = styled.Text`
  font-size: 38px;
  font-weight: bold;
  color: ${COLORS.darkBlue};
  margin-top: 15%;
`;
const SPNameText = styled.Text`
  font-size: 24px;
  margin-top: 20px;
  color: ${COLORS.darkBlue};
  border-bottom-width: 2px;
  border-bottom-color: ${COLORS.darkBlue};
  padding: 10px;
`;
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
  const [serialNum, setSerialNum] = useState("");
  const [sportGN, setSportGn] = useState("");
  const [checkedMan, setCheckedMan] = useState(false);
  const [checkedWoman, setCheckedWoman] = useState(false);

  const { setContact, contact, checkStorage } = useContext(AppContext);

  const saveContact = () => {
    if (name === "" && serialNum === "" && sportGN === "") {
      Alert.alert("Lütfen hep boşluğu doldurun");
    } else {
      setContact([{ name, serialNum, sex: checkedMan ? "male" : "female" }]);
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    if (!contact.name) {
      checkStorage();
    }
  }, []);
  console.log(contact);
  if (!contact.name) {
    return (
      <KeyboardAwareScrollView>
        <BackGround>
          <Container>
            <ImageComponent
              source={require("../assets/images/Screen_Shot_2022-10-27_at_13.56.36-removebg.png")}
            />
            <BodyContainer>
              <Input
                label="Cihazın seri numarası : "
                style={inputsStyle}
                inputStyle={{
                  color: COLORS.darkGreen,
                }}
                inputContainerStyle={{
                  borderBottomWidth: 0,
                }}
                containerStyle={{ height: 90 }}
                labelStyle={{ marginBottom: 10, color: COLORS.darkBlue }}
                onChangeText={(val) => setSerialNum(val)}
              />
              <Input
                label="Spor kompleksinin adı :"
                style={inputsStyle}
                inputContainerStyle={{
                  borderBottomWidth: 0,
                }}
                containerStyle={{ height: 90 }}
                inputStyle={{
                  color: COLORS.darkGreen,
                }}
                labelStyle={{
                  marginBottom: 10,
                  color: COLORS.darkBlue,
                }}
                onChangeText={(val) => setSportGn(val)}
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
                onChangeText={(val) => setName(val)}
              />

              <SexSelectContainer>
                <CheckboxContainer>
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
                </CheckboxContainer>
                <CheckboxContainer>
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
                </CheckboxContainer>
              </SexSelectContainer>
              <ButtonContainer>
                <CircleButton
                  title="üye Ol"
                  onPressFunction={() => saveContact()}
                />
              </ButtonContainer>
            </BodyContainer>
          </Container>
        </BackGround>
      </KeyboardAwareScrollView>
    );
  } else {
    return (
      <BackGround>
        <SPContainer>
          <SPimageComponent
            source={require("../assets/images/Screen_Shot_2022-10-27_at_13.56.36-removebg.png")}
          />
          <SPTitleText>Hoşgeldiniz</SPTitleText>
          <SPNameText>{`${contact.name} ${
            contact.sex === "female" ? "Hanım" : "Bey"
          }`}</SPNameText>

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
        </SPContainer>
      </BackGround>
    );
  }
};

export default Register;
