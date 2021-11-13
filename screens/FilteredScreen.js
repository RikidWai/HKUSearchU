import * as React from "react";
import { View, Text, Dimensions, StyleSheet, FlatList, Platform } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import config from "../config/firebaseCongfig";
import firebase from "firebase";
import { Button, Card, Title, Paragraph, Appbar, Avatar } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import DisplayImageScreen from "./DisplayImageScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSafeAreaFrame } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

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

const typeMapping = {
  elecDev: "Electronic Device",
  walletOrCreditCard: "Wallet/Credit Card",
  sidCard: "Student ID Card",
  octopus: "Octopus",
  clothes: "Clothes",
  umbrella : "Umbrella",
  waterBottle: "Water Bottle",
  love: "Love",
  others: "Others",
}



// const FilteredEntryScreen = (navigation, route) => {

//   return (
//     <NavigationContainer independent={true}>
//       <Stack.Navigator independent={true}>
//         <Stack.Screen
//           name="Home"
//           component={FilteredScreen}
//         />
//         <Stack.Screen name="DisplayImage" component={DisplayImageScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

const FilteredScreen = ({ navigation, route }) => {
  let dataLo = [];
  // let locationKey = [{"key": "HKU"}];
  const [locationKey, setlocationKey] = React.useState("");
  const [records, setrecords] = React.useState("");

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
      .ref("data")
      .on("value", (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          //console.log(childSnapshot);
          locationKeyTemp.push(childSnapshot.key);
          recordsTemp[childSnapshot.key] = childSnapshot.val();
        });
        // sortData();
        //console.log(locationKeyTemp);
        locationKeyTemp.sort((a,b) => a < b );
        //console.log(locationKey);
        locationKeyTemp.forEach(key => {
          if (recordsTemp[key].location == route.params.location) {
            locationKeyFiltered.push(key);
          }
        })
        setrecords(recordsTemp);
        setlocationKey(locationKeyFiltered);
      });
  }


  //Bug here
  const [listOfKey, setlistofKey] = React.useState(() => {
    let locationKeyTemp = [];
    let recordsTemp = {};
    let locationKeyFiltered = [];
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }

    firebase
      .database()
      .ref("data")
      .on("value", (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          //console.log(childSnapshot);
          locationKeyTemp.push(childSnapshot.key);
          recordsTemp[childSnapshot.key] = childSnapshot.val();
        });
        // sortData();
        //console.log(locationKeyTemp);
        locationKeyTemp.sort((a,b) => a < b );
        //console.log(locationKey);
        locationKeyTemp.forEach(key => {
          if (recordsTemp[key].location == route.params.location) {
            locationKeyFiltered.push(key);
          }
        })
        setrecords(recordsTemp);
        setlocationKey(locationKeyFiltered);
      });
  })


  function sortData() {
    console.log(locationKey);
  }

  return (
    <View style={styles.view}>
      <Appbar.Header>
        <Appbar.Content title={"Records for "+route.params.location} subtitle={'All Records'} />
        <Appbar.Action icon="refresh" onPress={getData} />
      </Appbar.Header>
      <ScrollView>
        <FlatList data={locationKey} renderItem={({item}) => 
          <Card style={styles.card}>
            <Card.Title title={typeMapping[records[item].type]} subtitle={records[item].date}/>
            <Card.Content>
              <Title>{records[item].description}</Title>
              <Paragraph>Location: {records[item].location}</Paragraph>
              <Paragraph>Detailed Lcoation: {records[item].detailedLocation}</Paragraph>
              <Paragraph>Retrieve: {records[item].retrieve}</Paragraph>
              <Button mode={"contained"} onPress={() =>
                  navigation.navigate('DisplayImage', { key: item })
                } icon="image">
                  View Image
                </Button>
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

export default FilteredScreen