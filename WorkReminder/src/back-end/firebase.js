import * as firebase from "firebase"
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAsxl3302m_JF68FWk-jPIryNJvR_-v-_c",
    authDomain: "mybdreactnative-73d43.firebaseapp.com",
    databaseURL: "https://mybdreactnative-73d43.firebaseio.com",
    projectId: "mybdreactnative-73d43",
    storageBucket: "mybdreactnative-73d43.appspot.com",
    messagingSenderId: "506445665622",
    appId: "1:506445665622:web:7fbc98587d13e2855732f7"
};

const firebaseApp = firebase.app.length > 0 ?
    firebase.initializeApp(firebaseConfig)
    :
    firebase.app()

const db = firebaseApp.firestore()
//export default db;
export { db, firebase }


