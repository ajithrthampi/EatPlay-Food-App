
import { initializeApp, getApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth}  from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getStorage} from "firebase/storage"

const firebaseConfig = {
  // databaseURL: "https://food-delivery-41c2c-default-rtdb.firebaseio.com",
  apiKey: "AIzaSyD7oNEsn2zMnaQQ-CeCW3vxmY0wKoWw7jI",
  authDomain: "eatplay-app.firebaseapp.com",
  projectId: "eatplay-app",
  storageBucket: "eatplay-app.appspot.com",
  messagingSenderId: "520903429089",
  appId: "1:520903429089:web:5a1ffce76bdcce85dee0a0"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp(): initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage =  getStorage(app) 

// const analytics = getAnalytics(app);
export default app;