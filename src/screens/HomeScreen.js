import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { create } from 'library/utils/normalize.js';
import { MapView, FAB, HomeBar } from 'library/components';
import RES from 'res';

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
  );
};
const styles = create({
  fabContainer: {
    position: 'absolute',
    bottom: 24,
  },
});

const mapStateToProps = (state) => ({
  displayName: state.auth.user?.displayName,
});

export default connect(mapStateToProps)(HomeScreen);

