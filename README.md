# liveTrackingMap

It's a sample app that uses react-native-maps and react-native-geolocation api to show live user tracking on the map.

## Install dependencies

# yarn install


## Runnin on Android Emulator

### Add your google api key here https://github.com/htthecool/liveTrackingMap/blob/main/android/app/src/main/AndroidManifest.xml#L26

## npx react-native run-android

## Running on IOS Simulator

You don't need to do anything if you want to use default IOS native maps. The project is by default configured for this.

### Install cocoapods dependencies

## cd ios && bundle exec pod install

The installation would take a few minutes. After the installation is complete, run the command to start the app in IOS Simulator (Assuming that you already have a simulator)

## npx react-native run-ios
