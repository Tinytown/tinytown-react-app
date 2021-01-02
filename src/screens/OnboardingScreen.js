import React, { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { goToUser } from 'rdx/locationState';
import { getLocation } from 'library/apis/geolocation';
import { create } from 'library/utils/normalize.js';
import { WorldMap, TwitterAuth, FAB, ActivityOverlay } from 'library/components';
import { withWait } from 'library/components/hoc';
import RES from 'res';

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
            label={RES.STRINGS.button.goToLocation}
            theme='green'
            icon='crosshairs'
            onPress={() => getLocation(goToUser)}/>}
      </ViewWithWait>
    </WorldMap>
  );
};

const styles = create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  userVisible: state.location.userVisible,
  storageLoaded: state.app.storageLoaded,
});

export default connect(mapStateToProps, { goToUser })(OnboardingScreen);
