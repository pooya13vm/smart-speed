import React from "react";
import { View, Dimensions } from "react-native";
import styled from "styled-components";

const { height, width } = Dimensions.get("window");
let bodyHeight = height - 130;

const Header = styled.View`
  width: 100%;
  height: 65px;
  justify-content: center;
  align-items: center;
  background-color: #c93838;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  margin-top: 40px;
`;
const Body = styled.View`
  height: ${bodyHeight}px;
  width: 100%;
  align-items: center;
`;
const Footer = styled.View`
  width: 100%;
  height: 65px;
  justify-content: center;
  align-items: center;
  background-color: #c93838;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;
const TitleText = styled.Text`
  color: #fefefe;
  font-size: 22px;
`;

const ScreenLayout = ({ title, children }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <TitleText>{title}</TitleText>
      </Header>
      <Body>{children}</Body>
      <Footer></Footer>
    </View>
  );
};

export default ScreenLayout;
