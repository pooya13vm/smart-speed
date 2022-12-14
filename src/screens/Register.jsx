import React, { useState, useContext, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, Button } from "@rneui/themed";
import styled from "styled-components";

//personal components
import BackGround from "../components/BackGround";
import { AppContext } from "../context/context";
import { COLORS } from "../tools/colors";
import CircleButton from "../components/CircleButton";
import WarningModal from "../components/WarningModal";
import { getPermission } from "../tools/getPermittion";

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
  margin-bottom: 10%;
`;
const BodyContainer = styled.View`
  width: 90%;
`;
const ButtonContainer = styled.View`
  margin-top: 20%;
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
  const [warningVisibility, setWarningVisibility] = useState(false);

  const { setContact, contact, checkStorage } = useContext(AppContext);

  const saveContact = () => {
    if (name === "" || serialNum === "" || sportGN === "") {
      setWarningVisibility(true);
    } else {
      setContact([{ name, serialNum }]);
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    checkStorage();
    getPermission().then((result) => console.log(result));
  }, []);
  if (contact.length == 0) {
    return (
      <KeyboardAwareScrollView>
        <BackGround>
          <Container>
            <ImageComponent
              source={require("../assets/images/Screen_Shot_2022-10-27_at_13.56.36-removebg.png")}
            />
            <BodyContainer>
              <Input
                label="Cihaz??n Seri Numaras?? : "
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
                label="Spor Kompleksinin Ad?? :"
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
                label="Kullan??c?? Ad?? : *"
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

              <ButtonContainer>
                <CircleButton
                  title="??ye Ol"
                  onPressFunction={() => saveContact()}
                />
              </ButtonContainer>
            </BodyContainer>
          </Container>
        </BackGround>
        <WarningModal
          setWarningVisibility={setWarningVisibility}
          warningVisibility={warningVisibility}
          title="Ayy !!!"
          note="L??tfen hep bo??lu??u doldurun."
        />
      </KeyboardAwareScrollView>
    );
  } else {
    return (
      <BackGround>
        <SPContainer>
          <SPimageComponent
            source={require("../assets/images/Screen_Shot_2022-10-27_at_13.56.36-removebg.png")}
          />
          <SPTitleText>Ho??geldin</SPTitleText>
          <SPNameText>{`${contact[0].name}`}</SPNameText>

          <Button
            title="Giri??"
            type="outline"
            buttonStyle={{
              marginTop: "30%",
              width: 150,
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
