import * as React from 'react';
import { Button, View, Text, Dimensions, StyleSheet, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/core';
import HomeStackScreen from "./HomeStackScreen";
import { render } from 'react-dom';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import FilteredScreen from './FilteredScreen';

const Stack = createNativeStackNavigator();

const EntryScreen = (navigation) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator independent={true}>
        <Stack.Screen
          name="Map"
          component={MapStackScreen}
        />
        <Stack.Screen name="FilteredRecords" component={FilteredScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const MapStackScreen = ({navigation}) => {
  const markers = [{
    title: 'Haking Wong Building',
    coordinates: {
      latitude: 22.283130,
      longitude: 114.136451
    },
  },
  {
    title: 'KBSB',
    coordinates: {
      latitude: 22.283453,
      longitude: 114.137094
    },  
  },
  {
    title: 'CYM',
    coordinates: {
      latitude: 22.283178,
      longitude: 114.139846
    }, 
  }]

  const handleMarkerPressed = (title) => {
    console.log("bullshit");
  }

    return (
      <View>
        <MapView style={styles.map} 
                  initialRegion={{
                    latitude: 22.283636,
                    longitude: 114.135511,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002,
                  }}>
          {markers.map(marker => (
            <Marker 
              coordinate={marker.coordinates}
              title={marker.title}
              key = {marker.title}
              onPress={() =>
                navigation.navigate('FilteredRecords', { location: marker.title })
              }
            >
              <Callout style={styles.plainView}>
                <View>
                  <Text>You pressed {marker.title}</Text>
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
      width: 60,
    },
  });

export default EntryScreen;