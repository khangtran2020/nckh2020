//React Native Slider
//https://aboutreact.com/react-native-slider/

//import React in our code
import React, {useState} from 'react';

//import all the components we are going to use
import {View, Text, SafeAreaView, StyleSheet, Button, Alert, Image} from 'react-native';
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
var co2 = 0;
var dust = 0;
var m2q = 0;
var power = 0;
var state = "";
console.disableYellowBox = true;
const db = firebase.database();

// const [sliderValue, setSliderValue] = useState(15);


const App = () => {
  const [sliderValue, setSliderValue] = useState(15);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center',}}>
      <View style={styles.container}>

        {/*Text to show slider value*/}
        <View style={{flex: 0.35, justifyContent: 'center', alignItems:'center'}}>
          <Image source={require('./images/TDN.png')}/>
        </View>
        <View style={{flex: 0.65, justifyContent: 'center',}}>
          <Text>Hello World!</Text>
          <Text>This is the Air Quality Checker app for NCKH 2020</Text>
          <Text>Click the button bellow to get the data</Text>
          <Button
            title="Get Data"
            color="chocolate"
            onPress={() => {
              firebase.database().ref("M2Q").once("value", (snapshot) => {
                m2q = snapshot.val().Value;
                console.log("M2Q:" + m2q);
                // Alert.alert("M2Q:" + m2q);
              });
              firebase.database().ref("Tvoc").once("value", (snapshot) => {
                temperature = snapshot.val().Value;
                console.log("Temperature:" + temperature);
                // Alert.alert("Temperature:" + temperature);
              });
              firebase.database().ref("Co2").once("value", (snapshot) => {
                co2 = snapshot.val().Value;
                console.log("co2:" + co2);
                // Alert.alert("Temperature:" + temperature);
              });
              firebase.database().ref("DustSensor").once("value", (snapshot) => {
                dust = snapshot.val().Value;
                console.log("dust:" + dust);
                // Alert.alert("Temperature:" + temperature);
              });
              Alert.alert("Temperature: " + temperature+", M2Q: " + m2q + ", CO2: "+ co2 +", Dust: "+dust);
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
              color="#f194ff"
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
             Power of Vaccum :
          </Text>
          <View style={{flex: 0.25, flexDirection: 'row'}}>
            <View style={{flex:0.2, backgroundColor: 'powderblue'}}>
              <Button title="0" color="orage"
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
            </View>
            <View style={{flex:0.2, backgroundColor: 'skyblue'}}>
              <Button title="1" color="orage"
              onPress={
                () => {
                  firebase.database().ref("Vacum").once("value").then(function(snapshot) {
                    state = snapshot.val().State;
                    if (state == "on") {
                      firebase.database().ref("Vacum").update({"State": "on"}).then(() => Alert.alert("Power 25%"));
                      firebase.database().ref("Vacum").update({"Power": 1});
                      // setSliderValue(0);
                    }
                    else {
                      firebase.database().ref("Vacum").update({"State": "on"}).then(() => Alert.alert("Turned on with power 25%"));
                      firebase.database().ref("Vacum").update({"Power": 1});
                    }
                  });
                }
              }
              />
            </View>
            <View style={{flex:0.2,backgroundColor: 'deepskyblue'}}>
              <Button title="2" color="orage"
              onPress={
                () => {
                  firebase.database().ref("Vacum").once("value").then(function(snapshot) {
                    state = snapshot.val().State;
                    if (state == "on") {
                      firebase.database().ref("Vacum").update({"State": "on"}).then(() => Alert.alert("Power 50%"));
                      firebase.database().ref("Vacum").update({"Power": 2});
                      // setSliderValue(0);
                    }
                    else {
                      firebase.database().ref("Vacum").update({"State": "on"}).then(() => Alert.alert("Turned on with power 50%"));
                      firebase.database().ref("Vacum").update({"Power": 2});
                    }
                  });
                }
              }
              />
            </View>
            <View style={{flex:0.2,backgroundColor: 'steelblue'}}>
              <Button title="3" color="orage"
              onPress={
                () => {
                  firebase.database().ref("Vacum").once("value").then(function(snapshot) {
                    state = snapshot.val().State;
                    if (state == "on") {
                      firebase.database().ref("Vacum").update({"State": "on"}).then(() => Alert.alert("Power 75%"));
                      firebase.database().ref("Vacum").update({"Power": 3});
                      // setSliderValue(0);
                    }
                    else {
                      firebase.database().ref("Vacum").update({"State": "on"}).then(() => Alert.alert("Turned on with power 75%"));
                      firebase.database().ref("Vacum").update({"Power": 3});
                    }
                  });
                }
              }
              />
            </View>
            <View style={{flex:0.2,backgroundColor: 'darkblue'}}>
              <Button title="4" color="orage"
              onPress={
                () => {
                  firebase.database().ref("Vacum").once("value").then(function(snapshot) {
                    state = snapshot.val().State;
                    if (state == "on") {
                      firebase.database().ref("Vacum").update({"State": "on"}).then(() => Alert.alert("Power 100%"));
                      firebase.database().ref("Vacum").update({"Power": 4});
                      // setSliderValue(0);
                    }
                    else {
                      firebase.database().ref("Vacum").update({"State": "on"}).then(() => Alert.alert("Turned on with power 100%"));
                      firebase.database().ref("Vacum").update({"Power": 4});
                    }
                  });
                }
              }
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default App;
