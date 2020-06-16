import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Container } from './styles'
import MapView, { Marker } from 'react-native-maps'

import * as FriendService from '../service/friendService'

export default function App() {


  const [myPosition, seMyposition] = useState(null)

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

  const [localizacaoAtual, setLocalizacaoAtual] = useState({
    latitude: -28.2653573,
    longitude: -52.3996577,
    latitudeDelta: 0.010,
    longitudeDelta: 0.010,
  })

  const [localizacoes, setLocalizacoes] = useState([
    {
    localizacao: {
      latitude: -28.2653573,
      longitude: -52.3996577,
      latitudeDelta: 0.010,
      longitudeDelta: 0.010,
    },
    title: 'IMED',
    description: "Campus Passo Fundo"
  }])

    useEffect(() => {
      getMyPosition()
      FriendService.getFriends().then(res =>{
        
        let teste = []
        res.forEach((item) => {
          teste.push({
            localizacao: item.localizacao ? item.localizacao : {} ,
            title: item.nome,
            description: item.telefone
          })
          console.log('res', teste )
        })
        setLocalizacoes(teste)
      }).catch(erro => console.log('erro',erro))
    }, [])

  return (
    <Container>
      
        <SafeAreaView style={{ flex: 1 }}>

          <MapView
            style={styles.mapStyle}
            initialRegion={localizacaoAtual}
            region={localizacaoAtual}
          >
            {
              localizacoes.map((item, key) => <Marker
                key={key}
                coordinate={item.localizacao}
                title={item.title}
                description={item.description}
              />)
            }

            {
              myPosition ? <Marker
                coordinate={myPosition}
                title={"Onde eu estou!"}
                description={"Minha Casa"}
              />

              : null}

          </MapView>
        </SafeAreaView>
    </Container>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});
