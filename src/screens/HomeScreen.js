import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { create } from 'library/utils/normalize.js';
import { WorldMap, FAB, HomeBar } from 'library/components';
import { withWait } from 'library/components/hoc';
import RES from 'res';

const HomeScreen = (props) => {
  const ViewWithWait = withWait(View);

  return (
    <WorldMap>
      <ViewWithWait waitFor={props.storageLoaded} style={styles.container} pointerEvents='box-none'>
        <HomeBar />
        <FAB
          label={RES.STRINGS.button.shout}
          theme='red'
          icon='megaphone'
          branded onPress={() => console.log(`LOUD NOISES from ${props.displayName}`)}/>
      </ViewWithWait>
    </WorldMap>
  );
};

const styles = create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  displayName: state.auth.user?.displayName,
  storageLoaded: state.app.storageLoaded,
});

export default connect(mapStateToProps)(HomeScreen);

