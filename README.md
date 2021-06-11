# Zoom-Integrated-React-Native-App

# Getting started
$ npm install react-native-zoom-us
$ react-native link react-native-zoom-us

# Installation

# Android

Add repository to android/build.gradle:
allprojects {
    repositories {
        flatDir {
            dirs "$rootDir/../node_modules/react-native-zoom-us/android/libs"
        }
    }
}  

Set minSdkVersion to 21
buildscript {
    ext {
        minSdkVersion = 21
    }
}

If you have problem with multiDex go to your project's android/app/build.gradle and under android.defaultSettings add the following:

android {
    defaultConfig {
        multiDexEnabled true
        ...
    }
    ...
}

## Usage

import ZoomUs from 'react-native-zoom-us';

// initialize minimal
await ZoomUs.initialize({
  clientKey: '...',
  clientSecret: '...',
  domain: 'zoom.us'
})


// Join Meeting
await ZoomUs.joinMeeting({
  autoConnectAudio: true,
  userName: 'sekar',
  meetingNumber: '...',
  password: '...',
})


