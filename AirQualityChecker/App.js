import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";

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
var state = "";
console.disableYellowBox = true;
const db = firebase.database();

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <Text>This is the Air Quality Checker app for NCKH 2020</Text>
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
      <StatusBar style="auto" />
      <Button
        title="Turn On"
        onPress={
          () => {
            firebase.database().ref("Vaccum").once("value").then(function(snapshot) {
              state = snapshot.val().value;
              if (state == "off") {
                firebase.database().ref("Vaccum").update({"value": "on"}).then(() => Alert.alert("Turned on"));
              }
              else {
                console.log("State of Vaccum: " + state);
                Alert.alert("The vaccum machine is already on");
              }
            })
          }
        }
        />
        <Button
          title="Turn Off"
          onPress={
            () => {
              firebase.database().ref("Vaccum").once("value").then(function(snapshot) {
                state = snapshot.val().value;
                if (state == "on") {
                  firebase.database().ref("Vaccum").update({"value": "off"}).then(() => Alert.alert("Turned off"));
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
