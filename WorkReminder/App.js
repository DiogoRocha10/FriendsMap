import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screen/Home'
import Mapa from './src/screen/Mapa'

//Desabilitano Warnings
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Setting a timer'])

//Configurando Encondig
import { decode, encode } from 'base-64'
if (!global.btoa) {
  global.btoa = encode
}
if (!global.atob) {
  global.atob = decode
}

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home" component={Home}
          options={{
            headerStyle: {
              backgroundColor:'#7159c1' ,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: true,
            title: "FRIENDS",
            headerTitleAlign: "center",
            headerLeft: null,
          }}  
        />
        <Stack.Screen
          name="Mapa" component={Mapa}
          options={{
            headerStyle: {
              backgroundColor:'#7159c1' ,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: true,
            title: "Mapa",
            headerTitleAlign: "center",
            headerLeft: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}