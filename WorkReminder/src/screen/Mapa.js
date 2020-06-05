import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert, TouchableOpacity, TextInput, KeyboardAvoidingView, SafeAreaView, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App(props) {

    const { navigation } = props;  
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
        pesquisaLatLong("imed passo fundo")

    }, [])

    return (
        <View style={styles.container}>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
            <TextInput
                style={styles.caixaTexto}
                placeholder="Informe o local"
                value={pesquisatxt}
                onChangeText={text => setPesquisaTxt(text)}
            />
            <View style={styles.bottomView}>
                <Text 
                onPress={() => navigation.replace("Home")}
                style={styles.backText}>Voltar</Text>
            </View>

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
            </SafeAreaView>
        </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  caixaBotao: {
    flexDirection: 'row'
  },
  caixaTexto: {
    width: "95%",
    marginBottom: 10,
    marginTop: 25,
    marginLeft: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  positionBox: {
    marginTop: -170,
    marginHorizontal: 40,
    padding: 25
  },
  bottomView: {
    marginLeft: 110,
    width: '30%',
    height: 40,
    backgroundColor: 'red',
    borderRadius: 20,
    color: "#FFF",
    marginTop: 1,
    alignItems: "center",
  },
  myLocationBox: {
    borderRadius: 150,
    width: 50,
    height: 50,
    marginTop: -130,
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5
  }
});
