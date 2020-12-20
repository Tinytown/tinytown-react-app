import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getUserLocation } from 'rdx/actions';
import { MapView, TwitterAuth, FAB, ActivityOverlay } from 'library/components';
import RES from 'res';

const OnboardingScreen = (props) => {
  const [isLoading, setisLoading] = useState(false);

  const renderButtons = () => {
    return (
      props.userLocation ?
        <TwitterAuth onLoading={(state) => setisLoading(state)} />
        :
        <FAB label={RES.STRINGS.button.goToLocation} theme='green' icon='crosshairs' onPress={props.getUserLocation}/>
    );
  };

  return (
    <MapView>
      <ActivityOverlay showOverlay={isLoading} />
      {props.storageLoaded && !isLoading ? renderButtons() : null}
    </MapView>
  );
};

const mapStateToProps = (state) => ({
  userLocation: state.location.user,
  storageLoaded: state.app.storageLoaded,
});

export default connect(mapStateToProps, { getUserLocation })(OnboardingScreen);
