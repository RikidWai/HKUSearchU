import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAUowyCkGQud44YYIIAxqA4np-pDSUIuqI",
    authDomain: "hku-search-u-d8930.firebaseapp.com",
    projectId: "hku-search-u-d8930",
    storageBucket: "hku-search-u-d8930.appspot.com",
    messagingSenderId: "1095126818076",
    appId: "1:1095126818076:web:93d410d1dd6608119aaed9",
    measurementId: "G-JBVW482ZSN"
  };

class config{
    getDbConfig() {
        return firebaseConfig;
    }
}


export default config;