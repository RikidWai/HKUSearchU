import * as React from "react";
import { View, Text, Dimensions, StyleSheet, FlatList, Platform } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import config from "../config/firebaseCongfig";
import firebase from "firebase";
import { Button, Card, Title, Paragraph, Appbar, Avatar } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";



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

const HomeStackScreen = ({ navigation }) => {
  let dataLo = [];
  // let locationKey = [{"key": "HKU"}];
  const [locationKey, setlocationKey] = React.useState("");
  const [records, setrecords] = React.useState("");

  // function componentWillMount() {
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp(firebaseConfig);
  //   } else {
  //     firebase.app();
  //   }

  //   firebase
  //     .database()
  //     .ref("location/CYM")
  //     .set({
  //       latitude: 5.0665,
  //       longtitude: 8.01413,
  //     })
  //     .then(() => {
  //       console.log("INSERTED!!");
  //     })
  //     .catch((error) => {
  //       console.log("ERROR inserting");
  //     });
  // }

  const getData = () => {
    let locationKeyTemp = [];
    let recordsTemp = {};
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }

    firebase
      .database()
      .ref("location")
      .on("value", (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          //console.log(childSnapshot);
          locationKeyTemp.push({ key: childSnapshot.key });
          recordsTemp[childSnapshot.key] = childSnapshot.val();
        });
        console.log(recordsTemp);
        setrecords(recordsTemp);
        setlocationKey(locationKeyTemp);
      });
  }

  const [listOfKey, setlistofKey] = React.useState(() => {
    let locationKeyTemp = [];
    let recordsTemp = {};
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }

    firebase
      .database()
      .ref("location")
      .on("value", (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          //console.log(childSnapshot);
          locationKeyTemp.push({ key: childSnapshot.key });
          recordsTemp[childSnapshot.key] = childSnapshot.val();
        });
        console.log(recordsTemp);
        setrecords(recordsTemp);
        setlocationKey(locationKeyTemp);
      });
  })

  // const [listOfData, setlistofData] = React.useState(() => {
  //   let recordsTemp = [];
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp(firebaseConfig);
  //   } else {
  //     firebase.app();
  //   }

  //   firebase
  //     .database()
  //     .ref("location")
  //     .on("value", (snapshot) => {
  //       snapshot.forEach(function (childSnapshot) {
  //         //console.log(childSnapshot);
  //         recordsTemp.push({ record: childSnapshot });
  //       });
  //       setrecords(recordsTemp);
  //       console.log(records);
  //     });
    
  // })



  function showData() {
    console.log(locationKey);
  }

  return (
    <View style={styles.view}>
      <Appbar.Header>
        <Appbar.Content title="Records" subtitle={'All Records'} />
        <Appbar.Action icon="refresh" onPress={getData} />
      </Appbar.Header>
      <ScrollView>
        <FlatList data={locationKey} renderItem={({item}) => 
          <Card style={styles.card}>
            <Card.Title title={records[item.key].description} subtitle={records[item.key].date}/>
            <Card.Content>
              <Title>{records[item.key].type}</Title>
              <Paragraph>Location: {records[item.key].location}</Paragraph>
              <Paragraph>Detailed Lcoation: {records[item.key].detailedLocation}</Paragraph>
              <Paragraph>Retrieve: {records[item.key].retrieve}</Paragraph>
            </Card.Content>

          </Card>
        }/>
        
      </ScrollView>
    </View>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40
  },
  card: {
    marginBottom: 10,
  },
  view: {
    marginBottom: 80,
  }
});

export default HomeStackScreen;
