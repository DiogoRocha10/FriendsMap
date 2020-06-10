import React, { useState } from 'react';
import { StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Input, Container, Form, LoginButton} from './styles'
import * as authService from '../service/authService'

export default function App(props) {

  const [mensagem, setMensagem] = useState("")
  const [email, setEmail] = useState("rdiogo190@gmail.com")
  const [password, setPassword] = useState("1234567")
  const { navigation } = props


  const validarLogin = () => {

    authService.login(email, password)
      .then(retorno => {
        navigation.replace('Home')
      })
      .catch(erro => {
        setMensagem(erro.message)
      })
    //     
  }

  return (
    <Container>
      <Text style={styles.mensagemErro}>{mensagem}</Text>
      <Form>
        <Input
          placeholder="e-mail"
          value={email}
          onChangeText={texto => setEmail(texto)}
        />
      </Form>
      <Form>
        <Input
        placeholder="password"
        value={password}
        secureTextEntry
        onChangeText={texto => setPassword(texto)}
        />
      </Form>
     <LoginButton>
        <Icon name="navigation" size={20} color="#FFF" onPress={validarLogin}/>
     </LoginButton>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, caixaTexto: {
    width: "90%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginTop: 5
  }, caixaBotao: {
    marginTop: 5,
    flexDirection: "row"
  },
  botao: {
    marginRight: 3
  },
  mensagemErro: {
    color: "red",
    marginLeft: 20  }
});
