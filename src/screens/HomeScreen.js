import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { withWait } from 'library/components/hoc';
import { WorldMap, FAB, HomeBar } from 'library/components';
import { STRINGS, normalizeStyles } from 'res';

const HomeScreen = ({ displayName, storageLoaded, userVisible }) => {
  const ViewWithWait = withWait(View);

  return (
    <WorldMap>
      <ViewWithWait waitFor={storageLoaded && userVisible !== null} style={styles.container} pointerEvents='box-none'>
        <HomeBar />
        <FAB
          label={STRINGS.button.shout}
          theme='red'
          icon='megaphone'
          branded
          onPress={() => console.log(`LOUD NOISES from ${displayName}`)}
          wrapperStyle={styles.fab}
        />
      </ViewWithWait>
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
  userVisible: state.location.userVisible,
});

export default connect(mapStateToProps)(HomeScreen);

