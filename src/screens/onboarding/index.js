import React, {useState} from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView from 'library/components/MapView'
import TwitterAuth from 'library/components/TwitterAuth'
import Scrim from 'library/components/Scrim'
import R from 'res/R'


const OnboardingScreen = () => {
  const [isLoading, setisLoading] = useState(false)

  return (
    <MapView>
      {isLoading ? 
        (<Scrim>
          <ActivityIndicator size="large" color={R.colors.skyBlue600} />
        </Scrim>)
      : 
        (<View style={styles.fabContainer}>
          <TwitterAuth onLoading={(state) => setisLoading(state)} />
        </View>)
      }
    </MapView>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 24
  }
});