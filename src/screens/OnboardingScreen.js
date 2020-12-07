import React, {useState} from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getUserLocation } from '../redux/actions';
import MapView from 'library/components/MapView'
import TwitterAuth from 'library/components/TwitterAuth'
import Scrim from 'library/components/Scrim'
import FAB from 'library/components/fab'
import R from 'res/R'

const OnboardingScreen = (props) => {
  const [isLoading, setisLoading] = useState(false)

  const renderButtons = () => {
    return (
      props.showSignIn ? 
        <TwitterAuth onLoading={(state) => setisLoading(state)} />
      : 
        <FAB label={R.strings.button.goToLocation} theme='green' icon='crosshairs' onPress={props.getUserLocation}/>
    )
  }
  
  return (
    <MapView>
      {isLoading ? 
        (<Scrim>
          <ActivityIndicator size="large" color={R.colors.skyBlue600} />
        </Scrim>)
      : 
        (<View style={styles.fabContainer}>
          {props.showButtons ? renderButtons() : null}
        </View>)
      }
    </MapView>
  )
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 24,
  }
});

const mapStateToProps = (state) => ({
    showSignIn: state.location.user,
    showButtons: state.app.loaded.map
})

export default connect(mapStateToProps, { getUserLocation })(OnboardingScreen)