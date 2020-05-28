// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, SafeAreaView, AsyncStorage } from 'react-native';
import MapView from 'react-native-maps';
import Dialog from "react-native-dialog";


export default class App extends React.Component {


  state = {
    shelterName: "",
    shelterLong: "",
    shelterLat: "",
    setPromptVisible: false,
    index: 0
  }
  
  storeData = async () => {
    try {                       //static setItem(key: string, value: string, [callback]: ?(error: ?Error) => void)
      await AsyncStorage.setItem( this.state.index.toString(), this.state);
    } catch (error) {
      console.log(error);
    }
  };

  getAllId = async() =>{
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, shelterList) => {
        shelterList.map((result, i, shelter) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = shelter[i][1];
        });
      });
    });
    return shelter;
  }


  makeDialogVisible = (event) => {
    this.setState({ setPromptVisible: true });
    this.setState({ shelterLong: event.coordinate.longitude });
    this.setState({ shelterLat: event.coordinate.latitude });
    this.setState({shelterName: ""});
  };
  onPress_Ok_ShelterNameDialog = () => {
    if(this.state.shelterName !== ""){
      this.setState({ setPromptVisible: false });
      this.setState({index: this.state.index + 1});
      this.storeData;
      console.log(this.state);
      // console.log(this.state.shelterLat);
      // console.log(this.state.shelterLong);
      // console.log(this.state.index);
    }else{
      Alert.alert('No shelter name was entered.')
    }

  };
  onPress_CANCEL_ShelterNameDialog = () => {
    this.setState({ setPromptVisible: false });
  };
  onChangeText = userText => {
    this.setState({ shelterName: userText });
  };
  handlerLongClick = (event) => {
    Alert.alert(
      "🚨WARNING🚨",
      'Do you want to create a shelter?',
      [
        { text: 'Cancel', /*onPress: () => console.log('Cancel Pressed'),*/ style: 'cancel', },
        { text: 'OK', onPress: () => this.makeDialogVisible(event) },
      ],
      { cancelable: false }
    );
  };


  render() {
    this.getAllId;
    return (
      
      <SafeAreaView style={styles.container}>
        <Dialog.Container visible={this.state.setPromptVisible}>
          <Dialog.Title>Enter the shelter's name</Dialog.Title>
          <Dialog.Input onChangeText={text => this.onChangeText(text)}></Dialog.Input>
          <Dialog.Button label="OK" onPress={this.onPress_Ok_ShelterNameDialog} />
          <Dialog.Button label="Cancel" onPress={this.onPress_CANCEL_ShelterNameDialog} />
        </Dialog.Container>

        <MapView style={styles.mapStyle} onLongPress={e => this.handlerLongClick(e.nativeEvent)}>
        </MapView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
