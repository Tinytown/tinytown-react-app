import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { WorldMap, FAB, HomeBar } from 'library/components';
import { STRINGS, normalizeStyles } from 'res';

const HomeScreen = ({ storageLoaded, navigation }) => {
  return (
    <WorldMap>
      {storageLoaded &&
      <View style={styles.container} pointerEvents='box-none'>
        <HomeBar />
        <FAB
          label={STRINGS.button.shout}
          theme='red'
          icon='megaphone'
          branded
          onPress={() => navigation.navigate('New Shout')}
          wrapperStyle={styles.fab}
        />
      </View>
      }
    </WorldMap>
  );
};

const styles = normalizeStyles({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
  },
});

const mapStateToProps = (state) => ({
  displayName: state.auth.user?.displayName,
  storageLoaded: state.app.storageLoaded,
});

export default connect(mapStateToProps)(HomeScreen);

