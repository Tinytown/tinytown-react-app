# Tinytown
The main application codebase.

## Instructions:
From root directory, issue:
```
yarn install
```

**For iOS**
1. Go into the iOS folder: `cd ios`
2. Install appropriate pods: `pod install`
3. Download [_GoogleService-Info.plist_](https://console.firebase.google.com/m/mobilesdk/projects/93374358023/clients/ios%3ATinytownReactApp/artifacts/1?param=%5B%22getArtifactRequest%22%2Cnull%2C%22ios%3ATinytownReactApp%22%2C%221%22%2C%2293374358023%22%5D&authuser=0) from Firebase and relative to current location, place it in the directory _tinytown_.
3. Move out of current directory: `cd ../`
4. Run the iOS simulator: `yarn react-native run-ios`

**For Android** Move out and run the Android simulator:
```
yarn react-native run-android
```

More on setting up your React Native dev environment can be found here: https://reactnative.dev/docs/environment-setup

**Mapbox Access Token**
1. Create a new .env file in the root directory
2. Add a line for the access token
```
MAPBOX_ACCESS_TOKEN=VALUE
```
3. Ping us in the [#mvp](https://tinytownhq.slack.com/archives/C014PUN9F71) Slack channel to get a token
