import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import { create } from 'library/utils/normalize.js'
import R from 'res/R';
import { IconButton, Menu, MenuDivider, MenuItem } from 'library/components';

// HomeBar - Used in the Home Screen

class HomeBar extends React.Component {
  _menu = null;

  settingsMenu = (ref) => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    return (
      <View style={[styles.homeContainer]}>
        <View style={[styles.itemsContainer, { flexDirection: 'row-reverse' }]}>
          <Menu
            ref={this.settingsMenu}
            button={
              <TouchableOpacity
                style={styles.accountButton}
                onPress={this.showMenu}>
                <Image
                  source={require('res/img/placeholder.png')}
                  style={styles.avatarImage}>
                </Image>
              </TouchableOpacity>}>
            <MenuItem label={R.STRINGS.menuItem.about} icon='info' onPress={this.hideMenu}/>
            <MenuDivider />
            <MenuItem label={R.STRINGS.menuItem.signOut} icon='signOut' onPress={this.hideMenu}/>
          </Menu>
        </View>
      </View>
    );
  }
}

// NavBar - Used for navigation

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
      children,
    } = this.props;
    return (
      <View style={styles.navContainer}>
        <View style={[styles.itemsContainer, { flexDirection: 'row' }]}>
          <IconButton icon='close' color={R.COLORS.graniteGray} onPress={onClose}/>
          <Text style={styles.navLabel}>{label}</Text>
        </View>
        <View style={[styles.itemsContainer, { flexDirection: 'row-reverse' }]}>
          {children}
        </View>
      </View>
    );
  }
}

// StyleSheet

const styles = create({

  homeContainer: {
    flexDirection: 'row',
    height: 72,
    paddingHorizontal: 16,
  },

  navContainer: {
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: 4,
    backgroundColor: R.COLORS.justWhite,
  },

  itemsContainer: {
    flex: 1,
    alignItems: 'center',
  },

  navLabel: {
    color: R.COLORS.asphaltGray,
    left: 12,
    top: 1,
    ...R.TYPOGRAPHY.headline5,
  },

  accountButton: {
    width: 44,
    height: 44,
    marginRight: -2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.COLORS.asphaltGray,
    borderRadius: R.SHAPES.radiusAll,
  },

  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: R.SHAPES.radiusAll,
  },
});

// Export

const AppBar = (props) => {
  const Component = props.type === 'home' ? HomeBar : NavBar;
  return <Component {...props} />
}
export default AppBar;
