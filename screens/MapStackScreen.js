import * as React from 'react';
import { Button, View, Text, Dimensions, StyleSheet, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/core';
import HomeStackScreen from "./HomeStackScreen";
import { render } from 'react-dom';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import FilteredScreen from './FilteredScreen';
import DisplayImageScreen from './DisplayImageScreen';

const Stack = createNativeStackNavigator();

const EntryScreen = (navigation) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator independent={true}>
        <Stack.Screen
          name="Map"
          component={MapStackScreen}
          options={{ headerStyle: {
            backgroundColor: '#4d9503'
         }, headerTitleStyle: {
          color: '#fff',
          // use your preferred color code
        }, headerTintColor: '#ffffff' }}
        />
        <Stack.Screen name="FilteredRecords" component={FilteredScreen} options={{headerShown: false}}/>
        <Stack.Screen name="DisplayImage" component={DisplayImageScreen} 
        options={{ headerStyle: {
          backgroundColor: '#4d9503'
       }, headerTitleStyle: {
        color: '#fff',
        // use your preferred color code
      }, headerTintColor: '#ffffff' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const MapStackScreen = ({navigation}) => {
  const markers = [
      {title: 'Chow Yei Ching Building',abbr: 'CB',coordinates: {latitude: 22.2830769, longitude: 114.1354785},},
      {title: 'Cheng Yu Tung Tower (Law)',abbr: 'CCT',coordinates: {latitude: 22.2832728, longitude: 114.1338341},},
      {title: 'The Jockey Club Tower (Social Sciences)',abbr: 'CJT',coordinates: {latitude: 22.2832748, longitude: 114.1346267},},
      {title: 'Composite Building',abbr: 'COB',coordinates: {latitude: 22.2831665, longitude: 114.1358367},},
      {title: 'Central Podium/Chi Wah Learning Commons',abbr: 'CPD',coordinates: {latitude: 22.2835196, longitude: 114.1347217},},
      {title: 'Run Run Shaw Tower (Arts)',abbr: 'CRT',coordinates: {latitude: 22.2836429, longitude: 114.1343884},},
      {title: 'Chong Yuet Ming Amenities Centre',abbr: 'CYA',coordinates: {latitude: 22.2827317, longitude: 114.1388971},},
      {title: 'Chong Yuet Ming Chemistry Building',abbr: 'CYC',coordinates: {latitude: 22.2829533, longitude: 114.1400373},},
      {title: 'Chong Yuet Ming Physics Building',abbr: 'CYP',coordinates: {latitude: 22.2831335, longitude: 114.1398076},},
      {title: 'Price Philip Dental Hospital',abbr: 'DENTAL',coordinates: {latitude: 22.2864015, longitude: 114.1440477},},
      {title: 'Eliot Hall',abbr: 'EH',coordinates: {latitude: 22.2825321, longitude: 114.1397318},},
      {title: 'Fung Ping Shan Building',abbr: 'FP',coordinates: {latitude: 22.2836267, longitude: 114.1390921},},
      {title: 'Graduate House',abbr: 'GH',coordinates: {latitude: 22.2819052, longitude: 114.1374791},},
      {title: 'Hui Oi Chow Science Building/Innowing',abbr: 'HC',coordinates: {latitude: 22.2828207, longitude: 114.1377578},},
      {title: 'Hung Hing Ying Building',abbr: 'HH',coordinates: {latitude: 22.2846194, longitude: 114.1378275},},
      {title: 'Haking Wong Building',abbr: 'HW',coordinates: {latitude: 22.2829607, longitude: 114.1367211},},
      {title: 'James Hsioung Lee Science Building',abbr: 'JL',coordinates: {latitude: 22.2825156, longitude: 114.1374791},},
      {title: 'Knowles Building',abbr: 'KB',coordinates: {latitude: 22.283278, longitude: 114.1384545},},
      {title: 'Kadoorie Biological Sciences Building',abbr: 'KBSB',coordinates: {latitude: 22.2834585, longitude: 114.1370788},},
      {title: 'K.K. Leung Building',abbr: 'KK',coordinates: {latitude: 22.2832756, longitude: 114.1390772},},
      {title: 'Library Building',abbr: 'LBN',coordinates: {latitude: 22.2832388, longitude: 114.1377455},},
      {title: 'Main Building',abbr: 'MB',coordinates: {latitude: 22.2840174, longitude: 114.1378437},},
      {title: 'May Hall',abbr: 'MH',coordinates: {latitude: 22.2822995, longitude: 114.1398247},},
      {title: 'Meng Wah Complex Building',abbr: 'MW',coordinates: {latitude: 22.2823473, longitude: 114.1391134},},
      {title: 'Pao Siu Loong Building',abbr: 'PS',coordinates: {latitude: 22.2845871, longitude: 114.1375099},},
      {title: 'Robert Black College',abbr: 'RBC',coordinates: {latitude: 22.281727, longitude: 114.1391758},},
      {title: 'Rayson Huang Theatre',abbr: 'RH',coordinates: {latitude: 22.282493, longitude: 114.1383358},},
      {title: 'Runme Shaw Building',abbr: 'RM',coordinates: {latitude: 22.282486, longitude: 114.1386374},},
      {title: 'Run Run Shaw Building',abbr: 'RR',coordinates: {latitude: 22.2825141, longitude: 114.1380132},},
      {title: 'Sassoon Road Campus',abbr: 'SASSOON',coordinates: {latitude: 22.2686596, longitude: 114.129359},},
      {title: 'Swire Hall',abbr: 'SWH',coordinates: {latitude: 22.283736, longitude: 114.139646},},
      {title: 'Tang Chi Ngong Building',abbr: 'TC',coordinates: {latitude: 22.283564, longitude: 114.139976},},
      {title: 'T.T. Tsui Building',abbr: 'TT',coordinates: {latitude: 22.2838914, longitude: 114.1394067},},
      {title: 'University Drive No.2',abbr: 'UD',coordinates: {latitude: 22.2818792, longitude: 114.1379605},},
      {title: 'University Lodge',abbr: 'UL',coordinates: {latitude: 22.2814862, longitude: 114.140047},},
      {title: 'Yam Pak Building',abbr: 'YP',coordinates: {latitude: 22.2841195, longitude: 114.1354031},}
    ]

    return (
      <View>
        <MapView style={styles.map} 
                  initialRegion={{
                    latitude: 22.283123,
                    longitude: 114.137053,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002,
                  }}>
          {markers.map(marker => (
            <Marker 
              coordinate={marker.coordinates}
              title={marker.title}
              key = {marker.title}
              onPress={() =>
                navigation.navigate('FilteredRecords', { location: marker.title, abbr: marker.abbr})
              }
            >
              <Callout style={styles.plainView}>
                <View>
                  <Text>{marker.abbr}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    );
  }



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    plainView: {
      //width: 60,
    },
  });

export default EntryScreen;