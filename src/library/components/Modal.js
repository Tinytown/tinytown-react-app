import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { normalizeStyles } from 'res';

const Modal = ({ visible, setVisible, children }) => {
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

export default Modal;
