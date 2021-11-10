// import * as React from 'react';
// import { Button, View, Text, Dimensions, StyleSheet } from 'react-native';
// import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, Platform } from "react-native";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAUowyCkGQud44YYIIAxqA4np-pDSUIuqI",
  authDomain: "hku-search-u-d8930.firebaseapp.com",
  projectId: "hku-search-u-d8930",
  storageBucket: "hku-search-u-d8930.appspot.com",
  messagingSenderId: "1095126818076",
  appId: "1:1095126818076:web:93d410d1dd6608119aaed9",
  measurementId: "G-JBVW482ZSN",
  databaseURL: "https://hku-search-u-d8930-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const SettingStackScreen = ({navigation}) => {
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

  const { control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      type: "",
      location: "",
      detailedLocation: "",
      date: "",
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

  var onSubmit = (data) => {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      else {
        firebase.app();
      }
      
      console.log(data);
      firebase.database().ref('location/test').set({
        type: data.type,
        location: data.location,
        detailedLocation: data.detailedLocation,
        date: date,
      }).then(() => {
        console.log('INSERTED!!')
      }).catch((error) => {
        console.log('ERROR inserting')
      })
  }

  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.headingStyle}>Form Builder Basic Demo</Text>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: "text",
              name: "type",
              textInputProps: {
                label: "Select Lost item type",
              },
            },
            {
              type: "text",
              name: "location",
              textInputProps: {
                label: "Select Location",
              },
            },
            {
              type: "text",
              name: "detailedLocation",
              textInputProps: {
                label: "Input detailed Location",
              },
            },

          ]}
        />
        <View>
          <Button mode={"contained"} onPress={showDatepicker} title="Show date picker!" />
        </View>
        <View>
          <Button mode={"contained"} onPress={showTimepicker} title="Show time picker!" />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Button mode={"contained"} title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View> */}

        <Button
          mode={"contained"}
          onPress={handleSubmit(onSubmit)}
          // onPress={(data) => handleSubmit(data)}
        >
          Submit
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  headingStyle: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 40,
  },
});

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
// });

export default SettingStackScreen;

// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, ScrollView, Text, Platform } from "react-native";
// import { FormBuilder } from "react-native-paper-form-builder";
// import { useForm } from "react-hook-form";
// import { Button } from "react-native-paper";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import * as ImagePicker from "expo-image-picker";

// export default function App() {
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== "web") {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== "granted") {
//           alert("Sorry, we need camera roll permissions to make this work!");
//         }
//       }
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };

//   const { control, setFocus, handleSubmit } = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     mode: "onChange",
//   });

//   const [date, setDate] = useState(new Date(Date.now()));
//   const [mode, setMode] = useState("date");
//   const [show, setShow] = useState(false);

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === "ios");
//     setDate(currentDate);
//   };

//   const showMode = (currentMode) => {
//     setShow(true);
//     setMode(currentMode);
//   };

//   const showDatepicker = () => {
//     showMode("date");
//   };

//   const showTimepicker = () => {
//     showMode("time");
//   };

//   return (
//     <View style={styles.containerStyle}>
//       <ScrollView contentContainerStyle={styles.scrollViewStyle}>
//         <Text style={styles.headingStyle}>Form Builder Basic Demo</Text>
//         <FormBuilder
//           control={control}
//           setFocus={setFocus}
//           formConfigArray={[
//             {
//               type: "email",
//               name: "email",
//               rules: {
//                 required: {
//                   value: true,
//                   message: "Email is required",
//                 },
//               },
//               textInputProps: {
//                 label: "Email",
//               },
//             },
//             {
//               type: "password",
//               name: "password",
//               rules: {
//                 required: {
//                   value: true,
//                   message: "Password is required",
//                 },
//               },
//               textInputProps: {
//                 label: "Password",
//               },
//             },
//           ]}
//         />
//         <View>
//           <Button mode={"contained"} onPress={showDatepicker} title="Show date picker!" />
//         </View>
//         <View>
//           <Button mode={"contained"} onPress={showTimepicker} title="Show time picker!" />
//         </View>
//         {show && (
//           <DateTimePicker
//             testID="dateTimePicker"
//             value={date}
//             mode={mode}
//             is24Hour={true}
//             display="default"
//             onChange={onChange}
//           />
//         )}
//         <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//           <Button mode={"contained"} title="Pick an image from camera roll" onPress={pickImage} />
//           {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//         </View>

//         <Button
//           mode={"contained"}
//           onPress={handleSubmit((data) => {
//             data.date = date;
//             yourObj = data.date;
//             console.log(date);
//             console.log("form data", data);
//           })}
//         >
//           Submit
//         </Button>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   containerStyle: {
//     flex: 1,
//   },
//   scrollViewStyle: {
//     flex: 1,
//     padding: 15,
//     justifyContent: "center",
//   },
//   headingStyle: {
//     fontSize: 30,
//     textAlign: "center",
//     marginBottom: 40,
//   },
// });