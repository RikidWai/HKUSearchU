import * as React from 'react';
import { Button, View, Text, Dimensions, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

const SettingStackScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Setting</Text>
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
});

export default SettingStackScreen;