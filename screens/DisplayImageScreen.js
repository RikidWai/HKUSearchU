import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet, FlatList, Platform, Image, LogBox } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import config from "../config/firebaseCongfig";
import firebase from "firebase";
import { Button, Card, Title, Paragraph, Appbar, Avatar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';



const firebaseConfig = {
    apiKey: "AIzaSyAUowyCkGQud44YYIIAxqA4np-pDSUIuqI",
    authDomain: "hku-search-u-d8930.firebaseapp.com",
    projectId: "hku-search-u-d8930",
    storageBucket: "hku-search-u-d8930.appspot.com",
    messagingSenderId: "1095126818076",
    appId: "1:1095126818076:web:93d410d1dd6608119aaed9",
    measurementId: "G-JBVW482ZSN",
    databaseURL: "https://hku-search-u-d8930-default-rtdb.asia-southeast1.firebasedatabase.app",
  };





const DisplayImageScreen = ({ navigation, route }) => {
    const [image, setImage] = useState(false);

    useEffect(() => {
        let imageRef = firebase.storage().ref('images/'+route.params.key);
        imageRef
        .getDownloadURL()
        .then((url) => {
            console.log(url);
            setImage(url);
        })
        .catch((e) => console.log("getting downloadURL of image error => ", e));
    }, []);
    return ( 
    <View>
        <View>
            {image && <Image source={{uri: image}} style={styles.image} />}
        </View>
    </View>)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 40,
    },
    card: {
      marginBottom: 10,
    },
    view: {
      marginBottom: 80,
    },
    image: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").width,
      resizeMode: "contain",
    },
  });

export default DisplayImageScreen;