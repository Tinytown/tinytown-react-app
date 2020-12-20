import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { create } from 'library/utils/normalize.js';
import { getUserLocation } from 'rdx/actions';
import { MapView, TwitterAuth, Scrim, FAB } from 'library/components';
import RES from 'res';

const OnboardingScreen = (props) => {
  const [isLoading, setisLoading] = useState(false);

  const renderButtons = () => {
    return (
      props.showSignIn ?
        <TwitterAuth onLoading={(state) => setisLoading(state)} />
        :
        <FAB label={RES.STRINGS.button.goToLocation} theme='green' icon='crosshairs' onPress={props.getUserLocation}/>
    );
  };

  return (
    <MapView>
      {isLoading ?
        (<Scrim>
          <ActivityIndicator size="large" color={RES.COLORS.skyBlue600} />
        </Scrim>)
        :
        (<View style={styles.fabContainer}>
          {props.showButtons ? renderButtons() : null}
        </View>)
      }
    </MapView>
  );
};

const styles = create({
  fabContainer: {
    position: 'absolute',
    bottom: 24,
  },
});

const mapStateToProps = (state) => ({
  showSignIn: state.location.user,
  showButtons: state.app.loaded.map,
});

export default connect(mapStateToProps, { getUserLocation })(OnboardingScreen);
