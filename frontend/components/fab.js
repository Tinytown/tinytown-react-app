import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { typography, colors, shapes } from '../styles'
import PlaceholderIcon from '../assets/svg/ic_placeholder'

const FAB = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={{ ...styles.fab, ...props.style }}>
        <PlaceholderIcon color={colors.asphaltGray} style={{ ...styles.fabIcon, ...props.iconStyling }}/>
        <Text style={{ ...styles.fabText, ...props.textStyling }}>
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
    flexDirection: 'row',
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
  },

  fabIcon: {
    marginRight: 12,
  }
})

export default FAB;