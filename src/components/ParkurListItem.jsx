import React from "react";
import styled from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../tools/colors";

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-horizontal: 10px;
  margin-top: 10px;
  align-self: center;
  margin-bottom: 15px;
`;
const ItemNameText = styled.Text`
  font-size: 16px;
  color: ${COLORS.darkBlue};
  width: 80px;
`;
const ItemTipText = styled.Text`
  font-size: 16px;
  color: ${COLORS.darkBlue};
  width: 70px;
  text-align: center;
`;
const ItemNumberText = styled.Text`
  font-size: 16px;
  color: ${COLORS.darkBlue};
  width: 50px;
  text-align: center;
`;
const IconContainer = styled.TouchableOpacity`
  border-width: 0.5px;
  padding-vertical: 5px;
  padding-horizontal: 6px;
  border-radius: 50px;
`;

const ParkurItem = ({ item, deleteItem }) => {
  return (
    <Container>
      <ItemNameText>{item.name}</ItemNameText>
      <ItemTipText>{item.tip}</ItemTipText>
      <ItemNumberText>{item.number}</ItemNumberText>
      <IconContainer onPress={() => deleteItem(item.id)}>
        <Icon name="trash" size={16} color={COLORS.darkBlue} />
      </IconContainer>
    </Container>
  );
};
export default ParkurItem;
