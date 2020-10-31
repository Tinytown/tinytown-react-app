import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  I18nManager,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import R from 'res/R';

const states = {
  hidden: 'hidden',
  animating: 'animating',
  shown: 'shown',
};

const easing = Easing.bezier(0.4, 0, 0.2, 1);
const screenIndent = 8;

class Menu extends React.Component {
  _container = null;

  constructor(props) {
    super(props);

    this.state = {
      menuState: states.hidden,

      top: 0,
      left: 0,

      menuWidth: 0,
      menuHeight: 0,

      buttonWidth: 0,
      buttonHeight: 0,

      menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
      opacityAnimation: new Animated.Value(0),
    };
  }

  _setContainerRef = (ref) => {
    this._container = ref;
  };

  // Start menu animation
  startMenuAnimation = (e) => {
    if (this.state.menuState === states.animating) {
      return;
    }

    const { width, height } = e.nativeEvent.layout;

    this.setState(
      {
        menuState: states.animating,
        menuWidth: width,
        menuHeight: height,
      },
      () => {
        Animated.parallel([
          Animated.timing(this.state.menuSizeAnimation, {
            toValue: { x: width, y: height },
            duration: this.props.animationDuration,
            easing,
            useNativeDriver: false,
          }),
          Animated.timing(this.state.opacityAnimation, {
            toValue: 1,
            duration: this.props.animationDuration,
            easing,
            useNativeDriver: false,
          }),
        ]).start();
      },
    );
  };

  _onDismiss = () => {
    if (this.props.onHidden) {
      this.props.onHidden();
    }
  };

  show = () => {
    this._container.measureInWindow((left, top, buttonWidth, buttonHeight) => {
      this.setState({
        buttonHeight,
        buttonWidth,
        left,
        menuState: states.shown,
        top,
      });
    });
  };

  hide = (onHidden) => {
    Animated.timing(this.state.opacityAnimation, {
      toValue: 0,
      duration: this.props.animationDuration,
      easing,
      useNativeDriver: false,
    }).start(() => {
      this.setState(
        {
          menuState: states.hidden,
          menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
          opacityAnimation: new Animated.Value(0),
        },
        () => {
          if (onHidden) {
            onHidden();
          }

          if (Platform.OS !== 'ios' && this.props.onHidden) {
            this.props.onHidden();
          }
        },
      );
    });
  };

  _hide = () => {
    this.hide();
  };

  render() {
    const { isRTL } = I18nManager;

    const dimensions = Dimensions.get('window');
    const { width: windowWidth } = dimensions;
    const windowHeight = dimensions.height - (StatusBar.currentHeight || 0);

    const {
      menuSizeAnimation,
      menuWidth,
      menuHeight,
      buttonWidth,
      buttonHeight,
      opacityAnimation,
    } = this.state;
    const menuSize = {
      width: menuSizeAnimation.x,
      height: menuSizeAnimation.y,
    };

    // Adjust position of menu
    let { left, top } = this.state;
    const transforms = [];

    if (
      (isRTL && left + buttonWidth - menuWidth > screenIndent) ||
      (!isRTL && left + menuWidth > windowWidth - screenIndent)
    ) {
      transforms.push({
        translateX: Animated.multiply(menuSizeAnimation.x, -1),
      });

      left = Math.min(windowWidth - screenIndent, left + buttonWidth);
    } else if (left < screenIndent) {
      left = screenIndent;
    }

    // Flip by Y axis if menu hits bottom screen border
    if (top > windowHeight - menuHeight - screenIndent) {
      transforms.push({
        translateY: Animated.multiply(menuSizeAnimation.y, -1),
      });

      top = windowHeight - screenIndent;
      top = Math.min(windowHeight - screenIndent, top + buttonHeight);
    } else if (top < screenIndent) {
      top = screenIndent;
    }

    const shadowMenuContainerStyle = {
      opacity: opacityAnimation,
      transform: transforms,
      top,

      // Switch left to right for rtl devices
      ...(isRTL ? { right: left } : { left }),
    };

    const { menuState } = this.state;
    const animationStarted = menuState === states.animating;
    const modalVisible = menuState === states.shown || animationStarted;

    const { testID, button, style, children } = this.props;

    return (
      <View ref={this._setContainerRef} collapsable={false} testID={testID}>
        <View>{button}</View>

        <Modal
          visible={modalVisible}
          onRequestClose={this._hide}
          supportedOrientations={[
            'portrait',
            'portrait-upside-down',
            'landscape',
            'landscape-left',
            'landscape-right',
          ]}
          transparent
          onDismiss={this._onDismiss}>
          <TouchableWithoutFeedback onPress={this._hide} accessible={false}>
            <View style={StyleSheet.absoluteFill}>
              <Animated.View
                onLayout={this.startMenuAnimation}
                style={[
                  styles.shadowMenuContainer,
                  shadowMenuContainerStyle,
                  style,
                ]}>
                <Animated.View
                  style={[styles.menuContainer, animationStarted && menuSize]}>
                  {children}
                </Animated.View>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

Menu.defaultProps = {
  animationDuration: 300,
};

const styles = StyleSheet.create({
  shadowMenuContainer: {
    position: 'absolute',
    opacity: 0,
    backgroundColor: R.COLORS.justWhite,
    borderRadius: R.SHAPES.radiusSm,
    ...R.SHAPES.elevGray2,
  },
  menuContainer: {
    overflow: 'hidden',
    paddingVertical: 8,
  },
});

export default Menu;
