import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { withWait } from 'library/components/hoc';
import { WorldMap, FAB, HomeBar } from 'library/components';
import { STRINGS, normalizeStyles } from 'res';

const HomeScreen = ({ displayName, storageLoaded }) => {
  const ViewWithWait = withWait(View);

  return (
    <WorldMap>
      <ViewWithWait waitFor={storageLoaded} style={styles.container} pointerEvents='box-none'>
        <HomeBar />
        <View style={styles.fab} >
          <FAB
            label={STRINGS.button.shout}
            theme='red'
            icon='megaphone'
            branded onPress={() => console.log(`LOUD NOISES from ${displayName}`)}/>

        </View>
      </ViewWithWait>
    </WorldMap>
  );
};

const styles = normalizeStyles({
  container: {
    flex: 1,
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

