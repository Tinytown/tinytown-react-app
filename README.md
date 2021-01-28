# Tinytown
The main codebase for the Tinytown React Native app.

## Instructions:

1. Set up React Native environment: https://reactnative.dev/docs/environment-setup
2. Clone this repo `git clone https://github.com/Tinytown/tinytown-react-app.git`
3. Install Yarn `brew install yarn`
4. From root directory, issue: `yarn setup` and follow the prompts.

**Environment Variables**
1. For the **Tinytown Team**:
    - Ask for your Developer Token on [Discord](https://ttown.app/discord).
    - Install [Doppler](https://doppler.com/) `brew install dopplerhq/cli/doppler`
    - **Important**: Make sure to run `yarn start` before `yarn android` | `yarn ios` in order for Doppler to work.
2. For **external contributors**: Open _react-app/src/config/env.config.js_ and replace values with your own.
3. Go into React folder: `cd react-app` and run Metro Bundler using `yarn start`
4. Go into Firebase folder: `cd firebase` and run Firebase Emulators using `yarn start`

**For iOS**
1. Go into the iOS folder: `cd ios`
2. Install appropriate pods: `pod install`
3. Download _GoogleService-Info.plist_ from Firebase console and place in the directory _tinytown_ relative to current location.
3. Move out of current directory: `cd ../`
4. Run the iOS simulator: `yarn ios`

**For Android**
1. Download _google-services.json_ from Firebase console and place it in the directory _android/app_ relative to repository's root directory.
2. Open a new tab in your terminal and run your Android emulator from any location. For instance: `emulator -avd Pixel_3_API_28`
3. In original tab, from the root of repository, run `yarn android`

## Troubleshooting
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

**functions@: The engine "node" is incompatible with this module. Expected version "12". Got "15.7.0**\
Caught by @alfalcon90\
Platform: Firebase\
Solution: `brew install node@12` then add these aliases to .zshrc to make it easier to switch between node versions:
```
alias node12='export PATH="/usr/local/opt/node@12/bin:$PATH"'
alias nodeX='export PATH="/usr/local/opt/node/bin:$PATH"'
```