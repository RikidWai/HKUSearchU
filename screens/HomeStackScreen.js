import * as React from 'react';
import { Button, View, Text, Dimensions, StyleSheet, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import config from '../firebaseCongfig';
import firebase from 'firebase';

const listOfName = [
  {key: 'Devin', latitude: '1.0', longtitude: '2.0'},
  {key: 'Dan', latitude: '1.0', longtitude: '2.0'},
  {key: 'Dominic', latitude: '1.0', longtitude: '2.0'},
  {key: 'Jason', latitude: '1.0', longtitude: '2.0'},
  {key: 'James', latitude: '1.0', longtitude: '2.0'},
  {key: 'Joel', latitude: '1.0', longtitude: '2.0'},
  {key: 'John', latitude: '1.0', longtitude: '2.0'},
  {key: 'Jillian', latitude: '1.0', longtitude: '2.0'},
  {key: 'Jimmy', latitude: '1.0', longtitude: '2.0'},
  {key: 'Julie', latitude: '1.0', longtitude: '2.0'},
]

const firebaseConfig = {
  apiKey: "AIzaSyAUowyCkGQud44YYIIAxqA4np-pDSUIuqI",
  authDomain: "hku-search-u-d8930.firebaseapp.com",
  projectId: "hku-search-u-d8930",
  storageBucket: "hku-search-u-d8930.appspot.com",
  messagingSenderId: "1095126818076",
  appId: "1:1095126818076:web:93d410d1dd6608119aaed9",
  measurementId: "G-JBVW482ZSN",
  databaseURL: "https://hku-search-u-d8930-default-rtdb.asia-southeast1.firebasedatabase.app"
};


const HomeStackScreen = ({navigation}) => {
  let dataLo = [];
  // let locationKey = [{"key": "HKU"}];
  const [locationKey, setlocationKey] = React.useState('');


  function componentWillMount() {

  
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    else {
      firebase.app();
    }
    
  
    firebase.database().ref('location/CYM').set({
      latitude: 5.0665,
      longtitude: 8.01413
    }).then(() => {
      console.log('INSERTED!!')
    }).catch((error) => {
      console.log('ERROR inserting')
    })
  };
  
  function getData() {
      let dataLo = [];
      let locationKeyTemp = [];
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      else {
        firebase.app();
      }
      
  
      firebase.database().ref('location').on("value", snapshot => {
        snapshot.forEach( function(childSnapshot) {
          console.log(childSnapshot.key);
          locationKeyTemp.push({key : childSnapshot.key});
        })
        setlocationKey(locationKeyTemp);
      })
      
      console.log(locationKey);
  };
  


function showData() {
    console.log(locationKey);
  }
  
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Button title="Insert Data" onPress={() => componentWillMount()}></Button>
        <Button title="Get Data" onPress={() => getData()}></Button>
        <Button title="Show Data" onPress={() => showData()}></Button>
        <FlatList
        data={locationKey}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
      </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });

export default HomeStackScreen;