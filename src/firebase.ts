import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: 'https://klutch-emprestimos-default-rtdb.firebaseio.com',
  projectId: process.env.PROJECT_ID,
  storageBucket: 'klutch-emprestimos.appspot.com',
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore()
const database = firebase.database()
const storage = firebase.storage()

export { firestore, database, storage }