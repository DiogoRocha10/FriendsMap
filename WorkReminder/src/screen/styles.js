import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Box = styled.View`
  width: 95%;
  border-width: 1px;
  border-radius: 10px;
  border-color: gray;
  padding: 10px;
  margin-top: 10px;
`;

export const BoxCollum = styled.View`
  width: 80%;
`;

export const BoxTitle = styled.Text`
  fontWeight: bold;
  color: blue;
`;

export const Erro = styled.Text`
  color: red;
  margin-left: 20px;
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
  margin-left: 60px;
  padding: 0 12px;
  height: 50px;
  width: 20%;
`;

export const ButtonSearch = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #7159c1;
  border-radius: 4px;
  margin-left: 3px;
  padding: 0 12px;
  height: 40px;
  width: 20%;
`;

export const LoginButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #7159c1;
  border-radius: 4px;
  margin-left: 125px;
  padding: 0 12px;
  height: 50px;
  width: 20%;
`;

export const ButtonIcon = styled(RectButton)`
  justify-content: center;
  background: #7159c1;
  border-radius: 4px;
  margin-left: 200px;
  padding: 15px;
  height: 50px;
  width: 20%;
  margin-top: -50px;
`;

export const ButtonDelete = styled(RectButton)`
  justify-content: center;
  background: #7159c1;
  border-radius: 4px;
  margin-left: 135px;
  padding: 15px;
  height: 50px;
  width: 20%;
  margin-top: -40px;
`;



