// import * as React from 'react';
// import { Button, View, Text, Dimensions, StyleSheet } from 'react-native';
// import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, Platform, Alert } from "react-native";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { TextInput, Button, Provider } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import uuid from 'react-native-uuid';
// import fbConfig from "../config/firebaseCongfig";

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

const SettingStackScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== "web") {
  //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== "granted") {
  //         alert("Sorry, we need camera roll permissions to make this work!");
  //       }
  //     }
  //   })();
  // }, []);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  // };

  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      type: "",
      location: "",
      detailedLocation: "",
      date: "",
      contact: "",
    },
    mode: "onChange",
  });

  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const getDate = () => {
    let tempDate = date.toString().split(" ");
    return date !== ""
      ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]} ${tempDate[4].substring(0, 5)}`
      : "";
  };

  var onSubmit = (data, date) => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }

    let uid = uuid.v4();
    let dest = "location/" + uid;
    console.log(date);
    firebase
      .database()
      .ref(dest)
      .set({
        type: data.type,
        location: data.location,
        detailedLocation: data.detailedLocation,
        description: data.description,
        retrieve: data.contact,
        date: getDate(),
      })
      .then(() => {
        console.log("INSERTED!!");
        Alert.alert("Report Submitted", "Thank you for your support");
      })
      .catch((error) => {
        console.log("ERROR inserting");
      });
    
      defaultValues = {
        type: "",
        location: "",
        detailedLocation: "",
        date: "",
        contact: "",
      }

  };

  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Provider>
          <Text style={styles.headingStyle}>Report Lost Item</Text>

          <FormBuilder
            control={control}
            setFocus={setFocus}
            formConfigArray={[
              {
                type: "autocomplete",
                name: "type",
                rules: {
                  required: {
                    value: true,
                    message: "Type is required",
                  },
                },
                textInputProps: {
                  label: "Type",
                  left: <TextInput.Icon name={"shape"} />,
                },
                options: [
                  {
                    value: "elecDev",
                    label: "Electronic Device",
                  },
                  {
                    value: "walletOrCreditCard",
                    label: "Wallet/Credit Card",
                  },
                  {
                    value: "sidCard",
                    label: "Student ID Card",
                  },
                  {
                    value: "octopus",
                    label: "Octopus",
                  },
                  {
                    value: "clothes",
                    label: "Clothes",
                  },
                  {
                    value: "umbrella",
                    label: "Umbrella",
                  },
                  {
                    value: "waterBottle",
                    label: " Water Bottle",
                  },
                  {
                    value: "others",
                    label: "Others",
                  },
                ],
              },
              {
                name: "location",
                type: "autocomplete",
                rules: {
                  required: {
                    value: true,
                    message: "Location is required",
                  },
                },
                textInputProps: {
                  label: "Location",
                  left: <TextInput.Icon name={"city"} />,
                },
                options: [
                  {
                    label: "Chong Yuet Ming Building",
                    value: "CYM",
                  },
                  {
                    label: "Noida",
                    value: 2,
                  },
                  {
                    label: "Delhi",
                    value: 3,
                  },
                  {
                    label: "Bangalore",
                    value: 4,
                  },
                  {
                    label: "Pune",
                    value: 5,
                  },
                  {
                    label: "Mumbai",
                    value: 6,
                  },
                  {
                    label: "Ahmedabad",
                    value: 7,
                  },
                  {
                    label: "Patna",
                    value: 8,
                  },
                ],
              },
              {
                type: "text",
                name: "detailedLocation",
                textInputProps: {
                  label: "Detailed Location",
                  left: <TextInput.Icon name={"map-marker"} />,
                },
              },
              {
                type: "text",
                name: "description",
                textInputProps: {
                  label: "Description",
                  left: <TextInput.Icon name={"card-text-outline"} />,
                },
              },
              {
                type: "text",
                name: "contact",
                textInputProps: {
                  label: "How to retrieve",
                  left: <TextInput.Icon name={"card-account-phone"} />,
                },
              },
            ]}
          />

          <TextInput
            mode="outlined"
            label="Date"
            disabled={true}
            value={getDate()}
            placeholder="Date..."
            icon="calendar"
            left={<TextInput.Icon name={"calendar-clock"} />}
          />
          <View style={styles.datetimeButnContainer}>
            <Button style={styles.datetimeButn} mode={"contained"} onPress={showDatepicker} icon="calendar-search">
              Date
            </Button>
            <Button style={styles.datetimeButn} mode={"contained"} onPress={showTimepicker} icon="clock">
              Time
            </Button>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              maximumDate={Date.now()}
            />
          )}

          {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Button mode={"contained"} title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View> */}
          <Button mode={"contained"} onPress={handleSubmit(onSubmit)} icon="send">
            Submit
          </Button>
        </Provider>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  scrollViewStyle: {
    flexGrow: 1,
    padding: 15,
    justifyContent: "center",
  },
  headingStyle: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 40,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 5,
    padding: 10,
  },
  datetimeButn: {
    marginVertical: 15,
    marginHorizontal: 30,
  },
  datetimeButnContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default SettingStackScreen;

