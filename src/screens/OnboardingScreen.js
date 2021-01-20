import React, { useState } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { connect } from 'react-redux';
import { goToUser } from 'rdx/locationState';
import { getLocation } from 'library/apis/geolocation';
import { withWait } from 'library/components/hoc';
import { WorldMap, TwitterAuth, FAB, ActivityOverlay } from 'library/components';
import { useAnimation } from 'library/hooks';
import { STRINGS, normalizeStyles } from 'res';

const OnboardingScreen = ({ storageLoaded, userVisible, goToUser }) => {
  const [authLoading, setAuthLoading] = useState(false);
  const [frontAnimation, backAnimation] = useAnimation('flip', userVisible);
  const ViewWithWait = withWait(View);
  const touchableProps = {
    pointerEvents: userVisible ? 'none' : 'auto',
  };

  return (
    <WorldMap>
      <ActivityOverlay showOverlay={authLoading} />
      <ViewWithWait
        waitFor={storageLoaded && !authLoading && userVisible !== null}
        style={styles.flipContainer}
        pointerEvents='box-none'
      >
        <Animated.View style={backAnimation} >
          <TwitterAuth onLoading={(state) => setAuthLoading(state)} />
        </Animated.View>
        <Animated.View style={frontAnimation} {...touchableProps} >
          <FAB
            label={STRINGS.button.goToLocation}
            theme='green'
            icon='crosshairs'
            onPress={() => getLocation(goToUser)}
          />
        </Animated.View>
      </ViewWithWait>
    </WorldMap>
  );
};

const styles = normalizeStyles({
  flipContainer: {
    position: 'absolute',
    bottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  userVisible: state.location.userVisible,
  storageLoaded: state.app.storageLoaded,
});

export default connect(mapStateToProps, { goToUser })(OnboardingScreen);
