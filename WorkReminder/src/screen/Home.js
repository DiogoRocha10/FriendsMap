import React, { useState, useEffect }  from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container,Form, SubmitButton, Input, Erro, TextStyle} from './styles'
import * as FriendService from '../service/friendService'
import * as Location from 'expo-location';


const Formulario = (props) => {
    const { navigation } = props

    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")
    const [endereco, setEndereco] = useState("")
    const [localizacao, setFriendPosition] = useState(null)
    const [error, setError] = useState("")

    const pesquisaLatLong = async (endereco) => {
      await Location.geocodeAsync(endereco)
        .then(resultado => {
          console.log('resultado', resultado[0])
          setFriendPosition(resultado[0])
        })
        .catch(erro => console.log(erro))
    }
    
    const limparDados = () => {
      setNome("")
      setTelefone("")
      setEndereco("")
    }

    useEffect(() => {

    }, [])

    return (
        <Container>
            <TextStyle>Informe os dados abaixo!</TextStyle>
            <Form>
            <Input
                placeholder="Nome"
                onChangeText={(valor) => setNome(valor)}
                value={nome}
            />
            </Form>
            <Form>
            <Input
                placeholder="Telefone"
                onChangeText={(valor) => setTelefone(valor)}
                value={telefone}
                keyboardType={'numeric'}
            />
            </Form>
            <Form>
            <Input
                placeholder="Endereço"
                onChangeText={(valor) => setEndereco(valor)}
                value={endereco}
            />
            </Form>

            <Erro>{error}</Erro>
            <Form>
              <SubmitButton>
                <Icon name="add" size={20} color="#FFF" onPress={async () => {
                  setError('')
                  let isValid = !!nome && !!telefone && !!endereco
                  if (!isValid) {
                    setError('Dados Incorretos!')
                    return
                  }
                  await pesquisaLatLong(endereco).then(res =>{
                    FriendService.saveFriend(nome, telefone, endereco, localizacao)
                    .then(res => {
                      setError("Dados Inseridos com Sucesso!")
                      setNome('')
                      setTelefone('')
                      setEndereco('')
                    })
                    .catch(erro => setError('Falha ao Inserir'))

                  })
                 
                }} />
              </SubmitButton>
              <SubmitButton>
                <Icon name="delete" size={20} color="#FFF" onPress={limparDados} />
              </SubmitButton>
              <SubmitButton>
                <Icon name="public" size={20} color="#FFF" onPress={() => {
                  navigation.navigate("Mapa")
                }} />
              </SubmitButton>
            </Form>
               
        </Container>
    )
}

export default Formulario

  