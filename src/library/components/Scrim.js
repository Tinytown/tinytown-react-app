import React from 'react'
import { View, StyleSheet } from 'react-native'

const Scrim = (props) => {
  return (
    <View style={styles.scrim} >
      {props.children}
    </View>
  )
}

export default Scrim

const styles = StyleSheet.create({
  scrim: {
    width: '100%',
    marginTop: -40,
    height: '113%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});

