import React, { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { goToUser } from 'rdx/locationState';
import { getLocation } from 'library/apis/geolocation';
import { withWait } from 'library/components/hoc';
import { WorldMap, TwitterAuth, FAB, ActivityOverlay } from 'library/components';
import { STRINGS, normalizeStyles } from 'res';

const OnboardingScreen = ({ storageLoaded, userVisible, goToUser }) => {
  const [authLoading, setAuthLoading] = useState(false);
  const ViewWithWait = withWait(View);

  return (
    <WorldMap>
      <ActivityOverlay showOverlay={authLoading} />
      <ViewWithWait waitFor={storageLoaded && !authLoading} style={styles.container} pointerEvents='box-none'>
        {userVisible ?
          <TwitterAuth onLoading={(state) => setAuthLoading(state)} />
          :
          <FAB
            label={STRINGS.button.goToLocation}
            theme='green'
            icon='crosshairs'
            onPress={() => getLocation(goToUser)}/>}
      </ViewWithWait>
    </WorldMap>
  );
};

const styles = normalizeStyles({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  userVisible: state.location.userVisible,
  storageLoaded: state.app.storageLoaded,
});

export default connect(mapStateToProps, { goToUser })(OnboardingScreen);
