import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { create } from 'library/utils/normalize.js'
import { colors, shapes, typography } from 'res'
import { IconButton } from 'library/components';


/* App Bar - World Map
============================================================================= */

class MapBar extends React.Component {
  render() {
    return (
        <View style={[styles.mapContainer]}>
          <View style={[styles.itemsContainer, {flexDirection: 'row-reverse'}]}>
            <TouchableOpacity style={styles.avatarButton}>
              <Image source={require('res/img/placeholder.png')} //replace with profile_image_url from Twitter API
               style={styles.avatarImage}></Image>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

/* App Bar - Navigation
============================================================================= */

class NavBar extends React.Component {
    static propTypes = {
      label: PropTypes.string.isRequired,
    };
  
    static defaultProps = {
      label: 'Screen Label',
    };

  render() {
    const {
      label,
      onClose,
      children
    } = this.props;
    return (
        <View style={[styles.navContainer]}>
          <View style={[styles.itemsContainer, {flexDirection: 'row'}]}>
                <IconButton icon='close' color={colors.graniteGray} onPress={onClose}/>
              <Text style={styles.navLabel}>{label}</Text>
          </View>
          <View style={[styles.itemsContainer, {flexDirection: 'row-reverse'}]}>
            {children}
          </View>
        </View>
    );
  }
}

/* StyleSheet
============================================================================= */

const styles = create({
  
  // Container
  mapContainer: {
    flexDirection: 'row',
    height: 72,
    paddingHorizontal: 16
  },

  navContainer: {
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: 4,
    backgroundColor: colors.justWhite
  },

  // App Bar Items
  itemsContainer: {
    flex: 1,
    alignItems: 'center'
  },

  navLabel: {
    color: colors.asphaltGray,
    left: 12,
    top: 1,
    ...typography.headline5
  },

  // Avatar
  avatarButton: {
    width: 44,
    height: 44,
    marginRight: -2, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.asphaltGray,
    borderRadius: shapes.radiusAll
  },

  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: shapes.radiusAll
  },
});

/* Export
============================================================================= */
const AppBar = props => {
  switch(props.type) {
    case "map":
      return <MapBar {...props} />;
    default:
      return <NavBar {...props} />;
  }
}
export default AppBar;
