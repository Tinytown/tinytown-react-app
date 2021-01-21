import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { connect } from 'react-redux';
import { goToUser } from 'rdx/locationState';
import { getLocation } from 'library/apis/geolocation';
import { withWait } from 'library/components/hoc';
import FAB from '../components/FAB';
import TwitterAuth from '../components/TwitterAuth';
import { useAnimation } from 'library/hooks';
import { STRINGS, normalizeStyles } from 'res';

const OnboardingButtons = ({ authLoading, setAuthLoading, storageLoaded, userVisible, goToUser }) => {
  const [frontAnimation, backAnimation] = useAnimation('flip', userVisible);
  const ViewWithWait = withWait(View);
  const touchableProps = {
    pointerEvents: userVisible ? 'none' : 'auto',
  };

  return (
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

export default connect(mapStateToProps, { goToUser })(OnboardingButtons);
