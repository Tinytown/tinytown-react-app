import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { colors, shapes } from 'res'


/* App Bar
============================================================================= */

class AppBar extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.rightItem}>
            <TouchableOpacity style={styles.avatarButton}>
              <Image source={require('res/img/placeholder.png')} //replace with profile_image_url from Twitter API
               style={styles.avatarImage}></Image>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  
  // Container
  container: {
    flexDirection: 'row',
    alignItems: "center",
    width: '100%',
    height: 72,
    paddingHorizontal: 16,
  },

  // App Bar Items
  leftItem: {
    flex: 1,
    alignItems: "flex-start",
  },
  centerItem: {
    flex: 2,
    alignItems: "center"
  },
  rightItem: {
    flex: 1,
    alignItems: "flex-end",
  },

  // Avatar
  avatarButton: {
    width: 44,
    height: 44,
    right: -2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.asphaltGray,
    borderRadius: shapes.radiusAll,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: shapes.radiusAll,
  },
})

/* Export
============================================================================= */
export default AppBar;