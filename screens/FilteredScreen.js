import * as React from "react";
import { View, Text, Dimensions, StyleSheet, FlatList, Platform } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import config from "../config/firebaseCongfig";
import firebase from "firebase";
import { Button, Card, Title, Paragraph, Appbar, Avatar, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
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
  wallet: "Wallet",
  sidCard: "Student ID Card",
  octopus: "Octopus",
  clothes: "Clothes",
  umbrella : "Umbrella",
  waterBottle: "Water Bottle",
  others: "Others",
};

const abbrMapping = {
  CB: "Chow Yei Ching Building",
  CCT: "Cheng Yu Tung Tower (Law)",
  CJT: "The Jockey Club Tower (Social Sciences)",
  COB: "Composite Building",
  CPD: "Central Podium/Chi Wah Learning Commons",
  CRT: "Run Run Shaw Tower (Arts)",
  CYA: "Chong Yuet Ming Amenities Centre",
  CYC: "Chong Yuet Ming Chemistry Building",
  CYP: "Chong Yuet Ming Physics Building",
  DENTAL: "Price Philip Dental Hospital",
  EH: "Eliot Hall",
  FP: "Fung Ping Shan Building",
  GH: "Graduate House",
  HC: "Hui Oi Chow Science Building/Innowing",
  HH: "Hung Hing Ying Building",
  HW: "Haking Wong Building",
  JL: "James Hsioung Lee Science Building",
  KB: "Knowles Building",
  KBSB: "Kadoorie Biological Sciences Building",
  KK: "K.K. Leung Building",
  LBN: "Library Building",
  MB: "Main Building",
  MH: "May Hall",
  MW: "Meng Wah Complex Building",
  PS: "Pao Siu Loong Building",
  RBC: "Robert Black College",
  RH: "Rayson Huang Theatre",
  RM: "Runme Shaw Building",
  RR: "Run Run Shaw Building",
  SASSOON: "Sassoon Road Campus",
  SWH: "Swire Hall",
  TC: "Tang Chi Ngong Building",
  TT: "T.T. Tsui Building",
  UD: "University Drive No.2",
  UL: "University Lodge",
  YP: "Yam Pak Building",

};


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
          if (recordsTemp[key].location == route.params.abbr) {
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
          if (recordsTemp[key].location == route.params.abbr) {
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

  const avatarMapping = {
    elecDev: "cellphone",
    wallet: "wallet",
    sidCard: "card-account-details",
    octopus: "numeric-8-box",
    clothes: "hanger",
    umbrella: "umbrella",
    waterBottle: "water",
    others: "shape-plus",
  };


  var getAvatar = (type) => {
    return avatarMapping[type];
  };

  return (
    <PaperProvider theme={cardTheme}>
    <View style={styles.view}>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={navigation.goBack} />
        <Appbar.Content title={"Records for "+route.params.abbr} subtitle={route.params.location} />
        <Appbar.Action icon="refresh" onPress={getData} />
      </Appbar.Header>
      <ScrollView>
        <FlatList data={locationKey} renderItem={({item}) => 
          <Card style={styles.card}>

            <Card.Title 
              title={typeMapping[records[item].type]} 
              subtitle={records[item].date}

              left = {props => <Avatar.Icon {...props} icon={getAvatar(records[item].type)} />}

              />
            <Card.Content>
              <Title>{records[item].description}</Title>
              <Paragraph>Location: {abbrMapping[records[item].location]}</Paragraph>
              <Paragraph>Detailed Lcoation: {records[item].detailedLocation}</Paragraph>
              <Paragraph>Retrieve: {records[item].retrieve}</Paragraph>
              {/* <Button mode={"contained"} onPress={() =>
                  navigation.navigate('DisplayImage', { key: item })
                } icon="image">
                  View Image
                </Button> */}
            </Card.Content>
            <Card.Actions>
              <Button onPress={() =>
                  navigation.navigate('DisplayImage', { key: item })
                }>View Image</Button>
            </Card.Actions>

          </Card>
        }/>
        
      </ScrollView>
    </View>
    </PaperProvider>  
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
    //marginBottom: 80,
    backgroundColor: "#eaeaea",
    flex: 1
  }
});

const cardTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4d9503',
    accent: '#60be00',
    //background: '#eaeaea',
    //surface: '#f0fdf4',
  },
};

export default FilteredScreen