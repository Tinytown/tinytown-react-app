import React from 'react';
import { connect } from 'react-redux';
import { MapView, FAB, HomeBar } from 'library/components';
import RES from 'res';

const HomeScreen = (props) => {
  return (
    <MapView>
      <HomeBar />
      <FAB
        label={RES.STRINGS.button.shout}
        theme='red'
        icon='megaphone'
        branded onPress={() => console.log(`LOUD NOISES from ${props.displayName}`)}/>
    </MapView>
  );
};

const mapStateToProps = (state) => ({
  displayName: state.auth.user?.displayName,
});

export default connect(mapStateToProps)(HomeScreen);

