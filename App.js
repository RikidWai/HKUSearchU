import * as React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
                initialRegion={{
                  latitude: 22.283636,
                  longitude: 114.135511,
                  latitudeDelta: 0.04,
                  longitudeDelta: 0.05,
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