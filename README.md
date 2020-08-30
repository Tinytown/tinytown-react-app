# Tinytown
The main codebase for the Tinytown React Native app.

## Instructions:

1. Set up React Native environment: https://reactnative.dev/docs/environment-setup
2. Install Yarn `brew install yarn`
3. From root directory, issue: `yarn install`

**For iOS**
1. Go into the iOS folder: `cd ios`
2. Install appropriate pods: `pod install`
3. Download [_GoogleService-Info.plist_] from Firebase console and place in the directory _tinytown_ relative to current location.
3. Move out of current directory: `cd ../`
4. Run the iOS simulator: `yarn react-native run-ios`

**For Android**
1. Move out and run the Android simulator: `yarn react-native run-android`

**Credentials**
1. Create a new `.env` file in the root directory
2. Add the following lines to incorporate API-related credentials
```
MAPBOX_ACCESS_TOKEN=<MAPBOX_ACCESS_TOKEN_VALUE>
TWITTER_CONSUMER_SECRET=<TWITTER_CONSUMER_SECRET_VALUE>
```
- MAPBOX_ACCESS_TOKEN_VALUE: Ping the #vault channel in Discord to get the keys
- TWITTER_CONSUMER_SECRET_VALUE: API Secret under Twitter Authentication on Firebase Console

## Potential Errors
**EMFILE: too many open files**\
Caught by @keedyc\
Platform: Android\
Solution: Run these commands from root directory
```
brew update
brew install watchman
```
More info: https://github.com/facebook/create-react-app/issues/4540#issuecomment-393268543

**fatal error: module map file '/.../YogaKit/YogaKit.modulemap' not found**\
Caught by @alfalcon90\
Platform: iOS\
Solution: Open the /ios/tinytown.xcworkspace file instead of the .xcodeproj one.\
More info: https://github.com/facebook/react-native/issues/28503
