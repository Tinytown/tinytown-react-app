import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { typography, colors, shapes } from '../styles'

const FAB = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={{ ...styles.fab, ...props.style }}>
        <Text style ={{ ...styles.fabText, ...props.textStyling }}>
          {props.label}
        </Text>
      </View>
    </TouchableOpacity>  
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 16,
  },

  fab: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: shapes.allRadius,
    backgroundColor: colors.grassGreen600,
    ...shapes.elevGreen5
  },

  fabText: {
    bottom: 1,
    color: colors.asphaltGray,
    ...typography.subheader3
  }
})

export default FAB;