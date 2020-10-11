//React Native Slider
//https://aboutreact.com/react-native-slider/

//import React in our code
import React, {useState} from 'react';

//import all the components we are going to use
import {View, Text, SafeAreaView, StyleSheet, Button, Alert} from 'react-native';
import Slider from '@react-native-community/slider';
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBhL-mZYwOU3w7cm6MArYbtQwf8UJK9SZg",
  authDomain: "mq2esp.firebaseapp.com",
  databaseURL: "https://mq2esp.firebaseio.com",
  projectId: "mq2esp",
  storageBucket: "mq2esp.appspot.com",
  messagingSenderId: "482032220258",
  appId: "1:482032220258:web:1b45e0601fcf495d96793b",
  measurementId: "G-XQKPXGCR70",
};
if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}

var temperature = 0;
var power = 0;
var state = "";
console.disableYellowBox = true;
const db = firebase.database();

// const [sliderValue, setSliderValue] = useState(15);


const App = () => {
  const [sliderValue, setSliderValue] = useState(15);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/*Text to show slider value*/}
        <Text>Hello World!</Text>
        <Text>This is the Air Quality Checker app for NCKH 2020</Text>
        <Text>Click the button bellow to get the data</Text>
        <Button
          title="Get Data"
          onPress={() => {
            firebase
              .database()
              .ref("M2Q")
              .on("value", (snapshot) => {
                // console.log(snapshot);
                temperature = snapshot.val().Value;
                console.log("Temperature:" + temperature);
                Alert.alert("Temperature:" + temperature);
              });
          }}
        />
        <Text>Click the button bellow to turn on the vaccum</Text>
        <Button
          title="Turn On"
          onPress={
            () => {
              firebase.database().ref("Vacum").once("value").then(function(snapshot) {
                state = snapshot.val().State;
                if (state == "off") {
                  firebase.database().ref("Vacum").update({"State": "on"}).then(() => Alert.alert("Turned on"));
                }
                else {
                  console.log("State of Vaccum: " + state);
                  Alert.alert("The vaccum machine is already on");
                }
              })
            }
          }
          />
          <Text>Click the button bellow to turn off the vaccum</Text>
          <Button
            title="Turn Off"
            onPress={
              () => {
                firebase.database().ref("Vacum").once("value").then(function(snapshot) {
                  state = snapshot.val().State;
                  if (state == "on") {
                    firebase.database().ref("Vacum").update({"State": "off"}).then(() => Alert.alert("Turned off"));
                    firebase.database().ref("Vacum").update({"Power": 0});
                    setSliderValue(0);
                  }
                  else {
                    console.log("State of Vaccum: " + state);
                    Alert.alert("The vaccum machine is already off");
                  }
                });
              }
            }
            />
        <Text style={{color: 'black'}}>
           Power of Vaccum : {sliderValue}
        </Text>


        {/*Slider with max, min, step and initial value*/}
        <Slider
          maximumValue={100}
          minimumValue={0}
          minimumTrackTintColor="#307ecc"
          maximumTrackTintColor="#000000"
          step={1}
          value={sliderValue}
          onValueChange={
            (sliderValue) => {
              firebase.database().ref("Vacum").once("value").then(function(snapshot) {
                state = snapshot.val().State;
                if (state == "on") {
                  setSliderValue(sliderValue);
                  firebase.database().ref("Vacum").update({"Power": sliderValue});
                }
                else {
                  console.log("State of Vaccum: " + state);
                  Alert.alert("The vaccum machine is already off");
                  setSliderValue(0);
                }
              });
            }
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});

export default App;
