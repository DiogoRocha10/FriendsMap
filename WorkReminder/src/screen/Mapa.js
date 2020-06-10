import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Alert} from 'react-native';
import { Container, Form, ButtonSearch, Input} from './styles'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App(props) {
  const { navigation } = props

  const [pesquisatxt, setPesquisaTxt] = useState("")
  const [pesquisa, setPesquisa] = useState(null)
  const [myPosition, seMyposition] = useState(null)
  // Posição da IMED
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

  useEffect(() => {
    getMyPosition()
    pesquisaLatLong("")

  }, [])

  return (
    <Container>
        <Form>
          <Input
            placeholder="Informe o local"
            value={pesquisatxt}
            onChangeText={text => setPesquisaTxt(text)}
          />
          <ButtonSearch>
            <Icon name="add" size={20} color="#FFF" onPress={() => pesquisaLatLong(pesquisatxt)} />
          </ButtonSearch>
          <ButtonSearch>
            <Icon name="reply" size={20} color="#FFF" onPress={() => navigation.replace('Home')} />
          </ButtonSearch>
        </Form>
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
              title={"Pesquisa"}
              description={""}
            />

              : null}

          </MapView>
    </Container>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});
