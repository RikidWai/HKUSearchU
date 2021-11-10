import * as React from 'react';
import { Button, View, Text, Dimensions, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

const MapStackScreen = ({navigation}) => {
    return (
      <View>
        <MapView style={styles.map} 
                  initialRegion={{
                    latitude: 22.283636,
                    longitude: 114.135511,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002,
                  }}>
          <Marker coordinate={{ latitude: 22.283636,
                    longitude: 114.135511,}}
          />
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
  });

export default MapStackScreen;