import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'library/components/MapView'
import FAB from 'library/components/FAB';
import RES from 'res';
import HomeBar from 'library/components/HomeBar';

const HomeScreen = (props) => {
  return (
    <MapView>
      <HomeBar />
      <View style={styles.fabContainer}>
        <FAB
          label={RES.STRINGS.button.shout}
          theme='red'
          icon='megaphone'
          branded onPress={() => console.log(`LOUD NOISES from ${props.displayName}`)}/>
      </View>
    </MapView>
  )
}
const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 24,
  },
});

const mapStateToProps = (state) => ({
  displayName: state.auth.user?.displayName,
})

export default connect(mapStateToProps)(HomeScreen);

