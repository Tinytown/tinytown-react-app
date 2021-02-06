import React from 'react';
import { connect } from 'react-redux';
import { goToUser } from 'rdx/locationState';
import { getLocation } from 'library/apis/geolocation';
import { Flippable } from 'library/components/hoc';
import FAB from '../components/FAB';
import TwitterAuth from '../components/TwitterAuth';
import { STRINGS, normalizeStyles } from 'res';

const OnboardingButtons = ({ authLoading, setAuthLoading, storageLoaded, userVisible, goToUser }) => {
  const showButtons = storageLoaded && !authLoading && userVisible !== null;

  return (
    showButtons &&
      <Flippable trigger={userVisible} containerStyle={styles.flipContainer} >
        <TwitterAuth onLoading={setAuthLoading} />
        <FAB
          label={STRINGS.button.goToLocation}
          theme='red'
          icon='crosshairs'
          onPress={() => getLocation(goToUser)}
        />
      </Flippable>
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
