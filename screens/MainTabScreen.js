import React from "react";
import { Button, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import MapStackScreen from "./MapStackScreen";
import HomeStackScreen from "./HomeStackScreen";
import ReportStackScreen from "./ReportStackScreen";

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator 
    initialRouteName="Home" 
    activeColor="#fff"
    inactiveColor="#1d3900"
    barStyle={{ backgroundColor: '#6dbc2f' }}
    shifting={true}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "Home",
        //tabBarColor: "#FF6347",
        tabBarIcon: ({ color }) => 
        <Icon name="ios-home" color={color} size={26} />,
      }}
    />
    <Tab.Screen
      name="Map"
      component={MapStackScreen}
      options={{
        tabBarLabel: "Map",
        //tabBarColor: "#1f65ff",
        tabBarIcon: ({ color }) => <Icon name="ios-map" color={color} size={26} />,
      }}
    />
    <Tab.Screen
      name="Report Lost Item"
      component={ReportStackScreen}
      options={{
        tabBarLabel: "Report Lost Item",
        //tabBarColor: "#694fad",
        tabBarIcon: ({ color }) => <Icon name="document-text" color={color} size={26} />,
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;
