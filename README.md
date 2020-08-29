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
3. Download [_GoogleService-Info.plist_] from Firebase console and place in the directory _tinytown_ relative to current location.
3. Move out of current directory: `cd ../`
4. Run the iOS simulator: `yarn react-native run-ios`

**For Android** Move out and run the Android simulator:
```
yarn react-native run-android
```

More on setting up your React Native dev environment can be found here: https://reactnative.dev/docs/environment-setup

**Credentials**
1. Create a new .env file in the root directory
2. Add the following lines to incorporate API-related credentials
```
MAPBOX_ACCESS_TOKEN=<MAPBOX_ACCESS_TOKEN_VALUE>
TWITTER_CONSUMER_SECRET=<TWITTER_CONSUMER_SECRET_VALUE>
```

- MAPBOX_ACCESS_TOKEN_VALUE: Ping us in the [#mvp](https://tinytownhq.slack.com/archives/C014PUN9F71) Slack channel to get a token
- TWITTER_CONSUMER_SECRET_VALUE: API Secret from Firebase console's twitter authentication
