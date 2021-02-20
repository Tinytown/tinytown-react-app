import React from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import IconButton from './IconButton';
import Chip from './Chip';
import { COLORS, TYPOGRAPHY, STRINGS, normalizeStyles } from 'res';

const ShoutBox = ({
  value,
  setValue,
  limitIndicator,
  onSubmit = () => {},
  onFocus = () => {},
}) => {
  const { string, animation, show, disabled } = limitIndicator;
  const styles = generateStyles({ show });

  return (
    <View style={styles.container} >
      <TextInput
        style={styles.input}
        multiline
        autoFocus
        enablesReturnKeyAutomatically
        autoCorrect={false}
        placeholder={STRINGS.shouts.shoutBox}
        placeholderTextColor={COLORS.asphaltGray200}
        textAlignVertical='top'
        keyboardType='twitter'
        value={value}
        onChangeText={setValue}
        onSubmitEditing={onSubmit}
        onFocus={onFocus}
      />
      <View style={styles.btnContainer} >
        <Animated.View style={[styles.chipContainer, animation]} >
          <Chip
            label={string}
            theme={disabled ? 'red' : null}
            animationType={null}
            ripple={false}
          />
        </Animated.View>
        <IconButton
          icon='megaphone'
          theme='red'
          onPress={onSubmit}
          disabled={disabled}
        />
      </View>
    </View>
  );
};

const generateStyles = ({ show }) => {
  return normalizeStyles({
    container: {
      marginTop: 16,
      marginBottom: 84,
    },
    input: {
      width: '100%',
      height: 158,
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 24,
      borderRadius: 8,
      color: COLORS.asphaltGray800,
      backgroundColor: COLORS.asphaltGray50,
      ...TYPOGRAPHY.subheader2,
    },
    btnContainer: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: -28,
      right: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chipContainer: {
      marginRight: 12,
      opacity: show ? 1 : 0,
    },
  });
};

ShoutBox.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  limitIndicator: PropTypes.object,
  onSubmit: PropTypes.func,
  onFocus: PropTypes.func,
};

export default ShoutBox;
