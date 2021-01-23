import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import { normalizeStyles } from 'res';

const Modal = ({
  visible = false,
  setVisible = () => console.log('Pass a setVisible callback to this component'),
  children,
}) => {
  const backgroundProps = {
    style: [styles.background, !visible && {  display: 'none' }],
    pointerEvents: !visible ? 'box-none' : 'auto',
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setVisible(false)} >
        <View {...backgroundProps} />
      </TouchableWithoutFeedback>
      {children}
    </>
  );
};

const styles = normalizeStyles({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

Modal.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default Modal;
