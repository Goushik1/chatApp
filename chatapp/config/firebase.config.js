import {getApps,getApp,initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCKfb2WRi2HM_16JEzQbDBtOhpWwJOBl6Y",
    authDomain: "real-time-chat-app-expo.firebaseapp.com",
    projectId: "real-time-chat-app-expo",
    storageBucket: "real-time-chat-app-expo.appspot.com",
    messagingSenderId: "447260048987",
    appId: "1:447260048987:web:a4f44e22b94a1d8efac97e"
  };    

  const app = getApps.length>0 ? getApp() : initializeApp(firebaseConfig)
  const firebaseAuth = getAuth(app)
  const firestoreDB = getFirestore(app)

  export {app,firebaseAuth,firestoreDB};