import React, { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getUserLocation } from 'rdx/actions';
import { create } from 'library/utils/normalize.js';
import { MapView, TwitterAuth, FAB, ActivityOverlay } from 'library/components';
import { withWait } from 'library/components/hoc';
import RES from 'res';

const OnboardingScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const ViewWithWait = withWait(View);

  return (
    <MapView>
      <ActivityOverlay showOverlay={isLoading} />
      <ViewWithWait waitFor={props.storageLoaded && !isLoading} style={styles.container} >
        {props.userLocation ?
          <TwitterAuth onLoading={(state) => setIsLoading(state)} />
          :
          <FAB
            label={RES.STRINGS.button.goToLocation}
            theme='green'
            icon='crosshairs'
            onPress={props.getUserLocation}/>}
      </ViewWithWait>
    </MapView>
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
  userLocation: state.location.user,
  storageLoaded: state.app.storageLoaded,
});

export default connect(mapStateToProps, { getUserLocation })(OnboardingScreen);
