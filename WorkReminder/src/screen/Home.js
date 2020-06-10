import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Container, Input, SubmitButton, Form} from './styles';
import * as Location from 'expo-location';

export default function App(props) {
  const { navigation } = props;

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [loading, setLoaging] = useState(false)
  const [myPosition, seMyposition] = useState(null)
  const [pesquisa, setPesquisa] = useState(null)
  const [pesquisatxt, setPesquisaTxt] = useState("")


  const [localicaoAtual, setLocalicaoAtual] = useState({
    latitude: -28.2653573,
    longitude: -52.3996577,
    latitudeDelta: 0.010,
    longitudeDelta: 0.010,
  })

  const getMyPosition = async () => {
    let { status } = await Location.requestPermissionsAsync()

    if (status !== "granted") {
    Alert.alert("Permissão de acesso a localização negado!")
    } else {
    await Location.getCurrentPositionAsync({})
        .then(retorno => seMyposition(retorno.coords))
        .catch(error => Alert.alert("Erro ao acessar o GPS!"))
    }
  } 
  const pesquisaLatLong = async (endereco) => {
    let posicao = await Location.geocodeAsync(endereco)
    .then(resultado => {
        setPesquisa(resultado[0])
        setLocalicaoAtual({
        latitude: resultado[0].latitude,
        longitude: resultado[0].longitude,
        latitudeDelta: 0.010,
        longitudeDelta: 0.010,
        })
    })
    .catch(erro => console.log(erro))
}

  const limparDados = () => {
    setTitle("")
    setDescription("")
    setMensagem("")
    setPesquisaTxt("")
  }

  
  useEffect(() => {
    getMyPosition()
    pesquisaLatLong("imed passo fundo")

}, [])

  return (
    <Container>
        <Text>{mensagem}</Text>
      <Form>
        <Input
          placeholder='Informe o Nome do Amigo'
          value={title}
          onChangeText={texto => setTitle(texto)}
        />
      </Form>
      <Form>
        <Input
          placeholder='Informe o local'
          value={pesquisatxt}
          onChangeText={texto => setPesquisaTxt(texto)}
        />
      </Form>
      <Form> 
        <Input
          placeholder='Informe uma descrição'
          value={description}
          onChangeText={texto => setDescription(texto)}
        />
      </Form>
      <Form>
        <SubmitButton>
          <Icon name="reply" size={20} color="#FFF" onPress={() => navigation.replace("Login")}/>
        </SubmitButton>
        <SubmitButton>
          <Icon name="add" size={20} color="#FFF" onPress={() => pesquisaLatLong(pesquisatxt)} />
        </SubmitButton>
        <SubmitButton>
          <Icon name="delete" size={20} color="#FFF" onPress={limparDados}/>
        </SubmitButton>
      </Form>
      <View>
        <ActivityIndicator animating={loading} size="small" color="#00ff00" />
              <MapView
                style={styles.mapStyle}
                initialRegion={localicaoAtual}
                region={localicaoAtual}
            >
                {myPosition ? <Marker
                  coordinate={myPosition}
                  title={"Onde eu estou!"}
                  description={"Minha Casa"}
                  />

                  : null}
                {pesquisa ? <Marker
                coordinate={pesquisa}
                title={title}
                description={description}
                />
                : null}
            </MapView>  
        </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
})