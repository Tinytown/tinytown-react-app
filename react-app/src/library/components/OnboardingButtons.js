import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goToUser } from 'rdx/locationState';
import { getLocation } from 'library/apis/geolocation';
import { Config } from 'context';
import { Flippable } from 'library/components/hoc';
import FAB from '../components/FAB';
import TwitterAuth from '../components/TwitterAuth';
import { normalizeStyles } from 'res';

const OnboardingButtons = ({
  authLoading,
  setAuthLoading,
  storageLoaded,
  userVisible,
  goToUser,
  onTouchStart = () => {},
}) => {
  const { STRINGS } = useContext(Config.Context);
  const showButtons = storageLoaded && !authLoading && userVisible !== null;

  return (
    showButtons &&
      <Flippable trigger={userVisible} containerStyle={styles.flipContainer} onTouchStart={onTouchStart} >
        <TwitterAuth onLoading={setAuthLoading} />
        <FAB
          label={STRINGS.onboarding.goToLocation}
          theme='lt-red-floating'
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

OnboardingButtons.propTypes = {
  onTouchStart: PropTypes.func,
};

export default connect(mapStateToProps, { goToUser })(OnboardingButtons);
