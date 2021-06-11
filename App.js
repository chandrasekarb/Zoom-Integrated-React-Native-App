/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,TextInput,TouchableOpacity,useColorScheme,View} from 'react-native';

import {Colors,DebugInstructions,Header,LearnMoreLinks,ReloadInstructions} from 'react-native/Libraries/NewAppScreen';

import ZoomUs from 'react-native-zoom-us';


const App: () => Node = () => {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  useEffect(() => {
    (async () => {
      try {
        const initializeResult = await ZoomUs.initialize({
          clientKey: '...',
          clientSecret: '...',
          domain: 'zoom.us'
        });

        console.log({initializeResult});

        setIsInitialized(true);
      } catch (e) {
        alert('Error Could not execute initialize');
        console.error(e);
      }
    })();
  }, []);

  const joinMeeting = async () => {
    try {
      const joinMeetingResult = await ZoomUs.joinMeeting({
        autoConnectAudio: true,
        userName: 'sekar',
        meetingNumber: id,
        password: password,
      });

      console.log({joinMeetingResult});
      setId('');
      setPassword('');

    } catch (e) {
      alert('Error Could not execute joinMeeting');
      console.error(e);
    }
  };

  const joinMeeting1 = () => {
    alert('You id: '+id+' and password: '+password);
  }


  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={styles.pageContainer}>
          <Text style={styles.pageTitle}> Welcome to SekarZoomSDK</Text>

          <TextInput style={styles.textInput} placeholder="Enter Meeting Id"
            value={id}
            onChangeText={value => setId(value)}/>
          <TextInput style={styles.textInput} placeholder="Enter Meeting Password"
            value={password}
            onChangeText={value => setPassword(value)}/>

          <TouchableOpacity onPress={joinMeeting}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Join Meeting</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'blue',
    marginBottom: 50,
  },
  textInput: {
    height: 40,
    width: 200,
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
  button: {
    height: 46,
    marginTop: 30,
    width: 220,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 15,
  },
  buttonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    color: 'white'
  },
});

export default App;
