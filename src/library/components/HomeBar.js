import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { create } from 'library/utils/normalize.js'
import R from 'res/R';
import { Menu, MenuDivider, MenuItem } from './Menu';

class HomeBar extends React.Component {
  state = { showingMenu: false };

  hideMenu = () => {
    this.setState({
      showingMenu: false,
    });
  };

  showMenu = () => {
    this.setState({
      showingMenu: true,
    });
  };

  render() {
    const { showingMenu } = this.state
    return (
      <View style={[styles.homeContainer]}>
        <View style={[styles.itemsContainer, { flexDirection: 'row-reverse' }]}>
          <Menu
            showing={showingMenu}
            hideMenu={this.hideMenu}
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

const styles = create({
  homeContainer: {
    flexDirection: 'row',
    height: 72,
    paddingHorizontal: 16,
  },

  itemsContainer: {
    flex: 1,
    alignItems: 'center',
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

export default HomeBar;
