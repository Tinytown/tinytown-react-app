# Tinytown
The main application codebase.

## Instructions:
From root directory, issue:
```
npm install
```

Then, go into the iOS folder and install appropriate pods:
```
cd ios
pod install
```

**For iOS** Move out and run the iOS simulator:
```
npx react-native run-ios
```

**For Android** Move out and run the Android simulator:
```
npx react-native run-android
```

More on setting up your React Native dev environment can be found here: https://reactnative.dev/docs/environment-setup

**Mapbox Access Token**
1. Create a new .env file in the root directory
2. Add a line for the access token
```
MAPBOX_ACCESS_TOKEN=VALUE
```
3. Ping us in the [#mvp](https://tinytownhq.slack.com/archives/C014PUN9F71) Slack channel to get a token
