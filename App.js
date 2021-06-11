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
import {extractDataFromJoinLink} from './extractDataFromJoinLink';

const App: () => Node = () => {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');

  const [isInitialized, setIsInitialized] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  useEffect(() => {
    (async () => {
      try {
        const initializeResult = await ZoomUs.initialize({
          clientKey: 'glHNOrtN1uMWogQ7CI8gT5QBFSP3BmAxryGJ',
          clientSecret: 'cB8gAGZHVunb9yKOiBctQW9mhKouMPKWtyNq',
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

  const joinMeetingUsingUrl = async () => {
    try {
      const dataFromLink = extractDataFromJoinLink(url);

      const joinMeetingResult = await ZoomUs.joinMeeting({
        autoConnectAudio: true,
        userName: 'sekar',
        meetingNumber: dataFromLink.meetingNumber,
        password: dataFromLink.password,
      });

      console.log({joinMeetingResult});
      setUrl('');

    } catch (e) {
      alert('Error Could not execute joinMeeting');
      console.error(e);
    }
  };

  const joinMeeting1 = () => {
    const dataFromLink = extractDataFromJoinLink("https://zoom.us/j/96451150701?pwd=cDBpRS9XQkJrUjBPWklGVll0ZUx5UT09");
    console.log(dataFromLink.meetingNumber);
    console.log(dataFromLink.password);

    alert('You id: '+dataFromLink.meetingNumber+' and password: '+dataFromLink.password);
  }


  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={styles.pageContainer}>
          <Text style={styles.pageTitle}> Welcome to GetSetUp ZoomSDK</Text>

          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle1}> Join with Id and Password</Text>

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

          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle1}> Join with Invite URL</Text>

            <TextInput style={styles.urlInput} placeholder="Enter Meeting URL"
              value={url}
              onChangeText={value => setUrl(value)}/>

            <TouchableOpacity onPress={joinMeetingUsingUrl}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Join Meeting</Text>
              </View>
            </TouchableOpacity>
          </View>

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
    marginBottom: 30,
  },
  pageTitle1: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    width: 200,
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
  urlInput: {
    height: 40,
    width: 300,
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
  button: {
    height: 46,
    marginTop: 20,
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
