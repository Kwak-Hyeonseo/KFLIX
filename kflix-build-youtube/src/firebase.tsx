import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


type Config = { apiKey: string, authDomain: string, projectId: string, storageBucket: string, messagingSenderId: string, appId: string}

const firebaseConfig: Config = {
  apiKey: "AIzaSyBSIeVo6NILlmSILhglGeWgcifbGFl-lJM",
  authDomain: "netflix-clone-81eea.firebaseapp.com",
  projectId: "netflix-clone-81eea",
  storageBucket: "netflix-clone-81eea.appspot.com",
  messagingSenderId: "828355564808",
  appId: "1:828355564808:web:9c42c122acc5d4cea408bd",
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { auth }
export default db