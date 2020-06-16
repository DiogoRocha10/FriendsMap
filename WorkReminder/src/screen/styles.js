import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-color: #eee;
`;


export const Erro = styled.Text`
  color: red;
  margin-left: 20px;
`;

export const TextStyle = styled.Text`
  font-size: 18px;
  margin: 20px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 40px;
  background: #eee;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #7159c1;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #7159c1;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0px;
  height: 50px;
  width: 30%;
`;





