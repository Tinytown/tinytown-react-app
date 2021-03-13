import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import Scrim from './Scrim';
import { useAnimation } from 'library/hooks';
import { Config } from 'context';
import { SHAPES, normalizeStyles } from 'res';

const Dialog = ({
  openDialog = true,
  setOpenDialog = () => console.log('Pass a setOpenDialog callback to this component'),
  onClose = () => console.log('Pass an onClose callback to this component'),
  children,
}) => {
  const { COLORS } = useContext(Config.Context);
  const [dialogAnimation, scrimAnimation, animateOpen, animateClose] = useAnimation('dialog');
  const styles = generateStyles({ COLORS });

  useEffect(() => {
    openDialog ? animateOpen() : animateClose(onClose);
  }, [openDialog]);

  return (
    <>
      <Scrim onPress={() => setOpenDialog(false)} animationStyle={scrimAnimation} />
      <Animated.View style={[styles.container, dialogAnimation]} pointerEvents='box-none' >
        <View style={styles.dialog} >
          {children}
        </View>
      </Animated.View>
    </>
  );
};

const generateStyles = ({ COLORS }) => {
  return (
    normalizeStyles({
      container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        paddingHorizontal: 24,
        justifyContent: 'center',
      },
      dialog: {
        padding: 12,
        borderRadius: SHAPES.radiusMd,
        backgroundColor: COLORS.basics.justWhite,
        ...SHAPES.elevGray2,
      },
    })
  );
};

Dialog.propTypes = {
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default Dialog;
