import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Container, ButtonIcon, Form, SubmitButton, Input, Box, BoxCollum, BoxTitle, Erro, ButtonDelete} from './styles'
import * as WorkService from '../service/workService'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App(props) {

  const { navigation } = props

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [key, setKey] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [works, setWorks] = useState([])
  const [loading, setLoaging] = useState(false)


  const limparDados = () => {
    setTitle("")
    setDescription("")
    setMensagem("")
    setKey("")
  }

  const saveWork = () => {
    if (!title || !description) {
      setMensagem("Campos Inválidos")
    } else {
      const work = {
        title: title,
        description: description
      }
      WorkService.saveWork(work, key)
        .then(res => {
          setMensagem("Dados Inseridos com Sucesso!")
          getTrabalhos()
        })
        .catch(erro => setMensagem(erro))
    }
  }

  const deleteWork = (work) => {
    setLoaging(true)
    WorkService.deleteWork(work)
      .then(() => getTrabalhos())
      .catch(erro => setMensagem(erro))
  }

  const getTrabalhos = () => {
    setLoaging(true)
    WorkService.getWorks()
      .then(retorno => {
        console.log(retorno)
        setWorks(retorno)
        setLoaging(false)
      })
      .catch(erro => setMensagem(erro))
  }


  useEffect(() => {
    getTrabalhos()

  }, [])

  return (
    <Container>
      <Erro>{mensagem}</Erro>
      <Form>
        <Input
          placeholder='Informe o nome do Amigo'
          value={title}
          onChangeText={texto => setTitle(texto)}
        />
      </Form>
      <Form>
        <Input
          placeholder='Informe uma qualidade/defeito/apelido'
          value={description}
          onChangeText={texto => setDescription(texto)}
        />
      </Form>

      <Form>
        <SubmitButton>
          <Icon name="add" size={20} color="#FFF" onPress={saveWork} />
        </SubmitButton>
        <SubmitButton>
          <Icon name="delete" size={20} color="#FFF" onPress={limparDados} />
        </SubmitButton>
      </Form>

      <View>
        <ActivityIndicator animating={loading} size="small" color="#00ff00" />
        <FlatList
          data={works}
          renderItem={({ item }) =>
            <TouchableOpacity
              onPress={() => {
                setTitle(item.title)
                setDescription(item.description)
                setKey(item.key)
              }}
            >
              <Box>
                <BoxCollum>
                  <BoxTitle>{item.title}</BoxTitle>
                  <Text>{item.description}</Text>
                </BoxCollum>

                  <ButtonDelete>
                    <Icon name="delete" size={20} color="#FFF" onPress={() => deleteWork(item)} />
                  </ButtonDelete>
                  <ButtonIcon>
                    <Icon name="public" size={20} color="#FFF" onPress={() => navigation.replace('Mapa')} />
                  </ButtonIcon>
              </Box>
            </TouchableOpacity>
          }
        />
      </View>
    </Container >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 10,

  }, caixaTexto: {
    width: "97%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginTop: 7
  }, caixaTextoError: {
    width: "97%",
    borderWidth: 1,
    borderColor: "red",
    padding: 5,
    marginTop: 7
  }, caixaBotao: {
    marginTop: 5,
    flexDirection: "row"
  },
  botao: {
    marginRight: 3
  },
  mensagemErro: {
    color: "red",
    marginLeft: 20
  }, box: {
    flexDirection: "row",
    width: "95%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    padding: 10,
    marginTop: 10
  }, boxCollum: {
    width: "80%"
  },
  boxCollumAction: {
    width: "20%"
  },
  boxTitle: {
    fontWeight: "bold",
    color: "blue"
  }
});
