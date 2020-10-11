import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { typography, colors, shapes } from '../styles';
import Icon from '../assets/svg';

const styles = StyleSheet.create({
  
  // CONTAINER STYLES
  container: {
    flexDirection: 'column',
    width: 200,
    paddingLeft: 8,
    paddingVertical: 8,
    borderRadius: shapes.radiusMd,
    backgroundColor: colors.justWhite,
    ...shapes.elevGray2
  },

  // BUTTON CONTAINER STYLES
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
  },

  // ICON CONTAINER STYLES
  iconContainer: {
    alignItems: "center",
    width: 48,
    marginRight: 8,
  },

  // TEXT STYLES
  text: {
    color: colors.graniteGray,
    ...typography.subheader2
  },
});

const buttons = [
  {
    text: 'Sign Out',
    icon: 'signout',
    onPress: () => {
      console.log('Pressed Sign Out button');
    },
  },
  {
    text: 'About',
    icon: 'info',
    onPress: () => {
      console.log('Pressed About button');
    },
  },
];

class SettingsMenu extends React.Component {
  render() {
		return (
      <View
        style={styles.container}
      >
        {
          buttons.map(button => {
            return (
              <TouchableOpacity
                onPress={button.onPress}
                style={styles.buttonContainer}
                key={button.text}
              >
                <View style={styles.iconContainer}>
                  <Icon icon={button.icon} color={colors.graniteGray} />
                </View>
                <Text style={styles.text}>{button.text}</Text>
              </TouchableOpacity>
            );
          })
        }
			</View>
		)
	}
}

export default SettingsMenu;