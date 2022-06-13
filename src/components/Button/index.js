import React from 'react';
import styled from 'styled-components';

function onPress(props) {
  props.onPress();
}

const CustomButton = (props) => (
  <ButtonContainer
    onPress={() => onPress(props)}
    backgroundColor={props.backgroundColor}>
    <ButtonText textColor={props.textColor}>{props.text}</ButtonText>
  </ButtonContainer>
);

export default CustomButton;

const ButtonContainer = styled.TouchableOpacity`
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.backgroundColor};
`;

const ButtonText = styled.Text`
  margin-left: 18px;
  margin-right: 18px;
  font-size: 15px;
  color: ${(props) => props.textColor};
  text-align: center;
`;
