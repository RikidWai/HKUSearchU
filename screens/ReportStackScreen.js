// import * as React from 'react';
// import { Button, View, Text, Dimensions, StyleSheet } from 'react-native';
// import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, ScrollView, Text, Platform, Alert, LogBox, Dimensions, Pressable } from "react-native";
import { FormBuilder } from "../react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { TextInput, Button, Provider as PaperProvider, Appbar, DefaultTheme } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import uuid from 'react-native-uuid';
import color from 'color';
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

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  // alan
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
      
      // this.uploadImage(result.uri, "test-image1")
      //   .then(() => {
      //     Alert.alert("Success");
      //   })
      //   .catch((error) => {
      //     console.log("test4");
      //     console.log(error);
      //   });
    }
  };
  // alan
  uploadImage = async (uri, imageName) => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child('images/'+imageName);
    return ref.put(blob);
  };

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

  const getDateOnly = () => {
    let tempDateOnly = date.toString().split(" ");
    return date !== ""
      ? `${tempDateOnly[0]} ${tempDateOnly[1]} ${tempDateOnly[2]} ${tempDateOnly[3]}`
      : "";
  };

  const getTimeOnly = () => {
    let tempTimeOnly = date.toString().split(" ");
    return date !== ""
      ? `${tempTimeOnly[4].substring(0, 5)}`
      : "";
  };

  var onSubmit = (data, date) => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }

    let dateNow = Date.now();
    let uid = dateNow + "-"+ uuid.v4();
    let dest = "data/" + uid;
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
        defaultValues = {
          type: "",
          location: "",
          detailedLocation: "",
          date: "",
          contact: "",
        }
        
        Alert.alert("Report Submitted", "Thank you for your support");
      })
      .catch((error) => {
        console.log("ERROR inserting");
      });
    this.uploadImage(image, uid)
      .then(() => {
        Alert.alert("Image Upload Successfully");
      })
      .catch((error) => {
        console.log("test4");
        console.log(error);
      });
      

  };

  return (
    <View style={styles.containerStyle}>
      <Appbar.Header>
        <Appbar.Content title="Report Lost Item" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <PaperProvider theme={theme}>
          {/* <Text style={styles.headingStyle}>Report Lost Item</Text> */}

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
                  left: <TextInput.Icon name={"shape"}  color={"#009345"}/>,
                },
                options: [
                  {
                    value: "clothes",
                    label: "Clothing",
                  },
                  {
                    value: "elecDev",
                    label: "Electronic Device",
                  },
                  {
                    value: "octopus",
                    label: "Octopus",
                  },
                  {
                    value: "sidCard",
                    label: "Student ID Card",
                  },
                  {
                    value: "umbrella",
                    label: "Umbrella",
                  },
                  {
                    value: "wallet",
                    label: "Wallet",
                  },
                  {
                    value: "waterBottle",
                    label: "Water Bottle",
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
                  left: <TextInput.Icon name={"city"} color={"#009345"} />,
                },
                options: [            
                  {label: "Central Podium/Chi Wah Learning Commons",value: "CPD",},
                  {label: "Cheng Yu Tung Tower (Law)",value: "CCT",},
                  {label: "Chong Yuet Ming Amenities Centre",value: "CYA",},
                  {label: "Chong Yuet Ming Chemistry Building",value: "CYC",},
                  {label: "Chong Yuet Ming Physics Building",value: "CYP",},
                  {label: "Chow Yei Ching Building",value: "CB",},
                  {label: "Composite Building",value: "COB",},
                  {label: "Eliot Hall",value: "EH",},
                  {label: "Fung Ping Shan Building",value: "FP",},
                  {label: "Graduate House",value: "GH",},
                  {label: "Haking Wong Building",value: "HW",},
                  {label: "Hui Oi Chow Science Building/Innowing",value: "HC",},
                  {label: "Hung Hing Ying Building",value: "HH",},
                  {label: "James Hsioung Lee Science Building",value: "JL",},
                  {label: "K.K. Leung Building",value: "KK",},
                  {label: "Kadoorie Biological Sciences Building",value: "KBSB",},
                  {label: "Knowles Building",value: "KB",},
                  {label: "Library Building",value: "LBN",},
                  {label: "Main Building",value: "MB",},
                  {label: "May Hall",value: "MH",},
                  {label: "Meng Wah Complex Building",value: "MW",},
                  {label: "Pao Siu Loong Building",value: "PS",},
                  {label: "Price Philip Dental Hospital",value: "DENTAL",},
                  {label: "Rayson Huang Theatre",value: "RH",},
                  {label: "Robert Black College",value: "RBC",},
                  {label: "Run Run Shaw Building",value: "RR",},
                  {label: "Run Run Shaw Tower (Arts)",value: "CRT",},
                  {label: "Runme Shaw Building",value: "RM",},
                  {label: "Sassoon Road Campus",value: "SASSOON",},
                  {label: "Swire Hall",value: "SWH",},
                  {label: "T.T. Tsui Building",value: "TT",},
                  {label: "Tang Chi Ngong Building",value: "TC",},
                  {label: "The Jockey Club Tower (Social Sciences)",value: "CJT",},
                  {label: "University Drive No.2",value: "UD",},
                  {label: "University Lodge",value: "UL",},
                  {label: "Yam Pak Building",value: "YP",},
                ],
              },
              {
                type: "text",
                name: "detailedLocation",
                textInputProps: {
                  label: "Detailed Location",
                  left: <TextInput.Icon name={"map-marker"} color={"#009345"} />,
                },
              },
              {
                type: "text",
                name: "description",
                rules: {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                },
                textInputProps: {
                  label: "Description",
                  left: <TextInput.Icon name={"card-text"} color={"#009345"} />,
                },
              },
              {
                type: "text",
                name: "contact",
                rules: {
                  required: {
                    value: true,
                    message: "Retrieving method is required",
                  },
                },
                textInputProps: {
                  label: "How to retrieve",
                  left: <TextInput.Icon name={"card-account-phone"} color={"#009345"} />,
                },
              },
            ]}
          />
          <View style={styles.datetimeButnContainer}>
            {/* <Button style={styles.datetimeButn} mode={"contained"} onPress={showDatepicker} icon="calendar-search">
              Date
            </Button>
            <Button style={styles.datetimeButn} mode={"contained"} onPress={showTimepicker} icon="clock">
              Time
            </Button> */}
            <Pressable onPress={showDatepicker}>
            <TextInput
              
              mode="outlined"
              label="Date"
              disabled={true}
              value={getDateOnly()}
              placeholder="Date..."
              icon="calendar"
              left={<TextInput.Icon name={"calendar"} color={"#009345"} />}
            />
            </Pressable>
            <Pressable onPress={showTimepicker}>
              <TextInput
                
                mode="outlined"
                label="Time"
                disabled={true}
                value={getTimeOnly()}
                placeholder="Time..."
                icon="calendar"
                left={<TextInput.Icon name={"clock"} color={"#009345"} />}
              />
            </Pressable>
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

          <View>
            <Button mode={"contained"} title="Pick an image from camera roll" onPress={pickImage} icon="image-plus" style={styles.imageButton} >
              Upload Image 
            </Button>
            {image && <Image source={{ uri: image }} style={styles.image} />}
          </View>
          <Button mode={"contained"} onPress={handleSubmit(onSubmit)} icon="send" style={styles.submitButton}>
            Submit
          </Button>
        </PaperProvider>
      </ScrollView>
    </View>
  );
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4d9503',
    accent: '#60be00',
    //background: '#eaeaea',
    placeholder: color('black').alpha(0.65).rgb().string(),
    disabled: color('black').alpha(0.5).rgb().string(),
  },
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#eaeaea",
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
    justifyContent: "space-between",
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    resizeMode: 'contain'
  },
  imageButton: {
    marginVertical: 15,
    marginHorizontal: 30,
  },
  submitButton: {
    marginVertical: 15,
    marginHorizontal: 30,
  }

});

export default SettingStackScreen;

