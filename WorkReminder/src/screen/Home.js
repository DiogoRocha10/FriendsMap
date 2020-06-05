import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import * as WorkService from '../service/workService'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App(props) {
  const { navigation } = props;
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
    <View style={styles.container}>
      <Text>{mensagem}</Text>
      <TextInput
        style={title ? styles.caixaTexto : styles.caixaTextoError}
        placeholder='Informe o Nome do Amigo'
        value={title}
        onChangeText={texto => setTitle(texto)}
      />
      <TextInput
        style={description ? styles.caixaTexto : styles.caixaTextoError}
        placeholder='Informe a descrição do Trabalho'
        value={description}
        onChangeText={texto => setDescription(texto)}
      />


      <View style={styles.caixaBotao}>
        <Text
          onPress={saveWork}
          style={styles.botao}>Registrar</Text>
        <Text
        onPress={limparDados}
        style={styles.botao}>Limpar Dados</Text>
        <Text 
        onPress={() => navigation.replace("Mapa")}
        style={styles.botao}>Mapa</Text>

      </View>

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
              <View style={styles.box}>
                <View style={styles.boxCollum}>
                  <Text style={styles.boxTitle}>{item.title}</Text>
                  <Text>{item.description}</Text>
                </View>
                <View style={styles.boxCollumAction}>
                  <Text>
                    <Icon
                      onPress={() => deleteWork(item)}
                      name="trash"
                      size={30} color="red" />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          }
        />
      </View>
      <View style={styles.bottomView}>
        <Text 
          onPress={() => navigation.replace("Login")}
          style={styles.backText}>Sair</Text>
      </View>

    </View >
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
    marginRight: 3,
    width: '30%',
    height: 40,
    backgroundColor: 'green',
    borderRadius: 20,
    color: "#FFF",
    textAlign: "center",
    marginTop: 5

  },
  bottomView: {
    width: '97%',
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    borderRadius: 20,
    position: "absolute"
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
