'use strict';
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';

const BUTTON_HEIGHT = 48,
  BUTTON_HEIGHT_SM = 32;

//ERRORS ARE COMMON IN THIS FILE. YOU CAN IGNORE THEM (Annonations can be used in Typescript or JS)

class TinyTownBtn extends React.Component {
  props: {
    theme: 'disabled',
    type: 'default' | 'round' | 'small',
    opacity: number,
    icon?: number,
    caption?: string,
    ButtonColor?: any,
    style?: any,
    IconColor?: any,
    CaptionColor: any,
    fontSize?: number,
    // buttonColor?: string;
    // contentColor?: string;
    onPress: () => mixed,
  };

  static defaultProps = {
    opacity: 1,
    theme: 'pink',
  };

  static height = BUTTON_HEIGHT;

  render() {
    const {icon, fontSize, opacity} = this.props;
    const caption = this.props.caption;
    const {buttonTheme, iconTheme, captionTheme} = this.getTheme();
    const {containerType, buttonType, iconType, captionType} = this.getType();

    let iconImage;
    if (icon) {
      iconImage = (
        <Image source={icon} style={[styles.icon, iconTheme, iconType]} />
      );
    }

    let fontSizeOverride;
    if (fontSize) {
      fontSizeOverride = {fontSize};
    }

    const content = (
      <View style={[styles.button, buttonTheme, buttonType, {opacity}]}>
        {iconImage}
        <Text
          style={[styles.caption, captionTheme, captionType, fontSizeOverride]}>
          {caption}
        </Text>
      </View>
    );

    if (this.props.onPress) {
      return (
        <TouchableOpacity
          accessibilityTraits="button"
          onPress={this.props.onPress}
          activeOpacity={0.5}
          style={[styles.container, containerType, this.props.style]}>
          {content}
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={[styles.container, containerType, this.props.style]}>
          {content}
        </View>
      );
    }
  }

  getTheme() {
    const {theme} = this.props;
    const {ButtonColor} = this.props;
    const {IconColor} = this.props;
    const {CaptionColor} = this.props;
    let buttonTheme, iconTheme, captionTheme;

    //Set
    iconTheme = {tintColor: 'black'};
    captionTheme = {color: 'black'};

    if (ButtonColor === '') {
      buttonTheme = {backgroundColor: '#fff'};
    } else {
      buttonTheme = {backgroundColor: ButtonColor};
    }

    if (IconColor === '') {
      iconTheme = {tintColor: '#fff'};
    } else {
      iconTheme = {tintColor: IconColor};
    }

    if (CaptionColor === '') {
      captionTheme = {color: '#fff'};
    } else {
      captionTheme = {color: CaptionColor};
    }

    return {
      CaptionColor,
      IconColor,
      ButtonColor,
      buttonTheme,
      iconTheme,
      captionTheme,
    };
  }

  getType() {
    const {type} = this.props;
    let containerType, buttonType, iconType, captionType;

    if (type === 'round') {
      buttonType = {width: BUTTON_HEIGHT, paddingHorizontal: 0};
      iconType = {marginRight: 0};
      captionType = {fontSize: 13};
    } else if (type === 'small') {
      containerType = {height: BUTTON_HEIGHT_SM};
      buttonType = {paddingHorizontal: 20};
      iconType = {marginRight: 0};
      captionType = {fontSize: 13};
    } else {
      // defaults
    }

    return {containerType, buttonType, iconType, captionType};
  }
}

const styles = StyleSheet.create({
  container: {
    height: BUTTON_HEIGHT,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 17,
    borderRadius: BUTTON_HEIGHT / 2,
  },
  buttonRound: {
    width: BUTTON_HEIGHT,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 10,
  },
  caption: {
    fontSize: 15,
    textAlign: 'center',
  },
});

const Button = TinyTownBtn;
module.exports = Button;
