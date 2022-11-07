import React from "react";
import styled from "styled-components";
import { COLORS } from "../tools/colors";

const ListItemContainer = styled.View`
  flex-direction: row;
  width: 100%;
  padding-horizontal: 10px;
  margin-top: 10px;
  align-self: center;
  justify-content: space-between;
`;
const ListItemText = styled.Text`
  font-size: 16;
  color: ${COLORS.darkBlue};
  text-align: center;
`;
const ItemNumText = styled(ListItemText)`
  width: 20%;
`;
const ItemNameText = styled(ListItemText)`
  width: 40%;
`;
const ItemTimeText = styled(ListItemText)`
  width: 20%;
  margin-right: 25px;
`;
const TurnuvaItem = ({ item, index }) => {
  return (
    <ListItemContainer>
      <ItemNumText>{index + 1}</ItemNumText>
      <ItemNameText>{item}</ItemNameText>
      <ItemTimeText>00:00</ItemTimeText>
    </ListItemContainer>
  );
};
export default TurnuvaItem;
