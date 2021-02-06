import React from 'react';
import { View, TextInput } from 'react-native';
import Animated from 'react-native-reanimated';
import IconButton from './IconButton';
import Chip from './Chip';
import { useNewShout } from 'library/hooks';
import { COLORS, TYPOGRAPHY, STRINGS, normalizeStyles } from 'res';

const ShoutBox = ({ onSubmit }) => {
  const [value, setValue, limitIndicator, createNewShout] = useNewShout();
  const { string, animation, show, disabled } = limitIndicator;
  const styles = generateStyles({ show });

  const onSubmitHandler = () => {
    createNewShout();
    onSubmit();
  };

  return (
    <View style={styles.container} >
      <TextInput
        style={styles.input}
        multiline
        autoFocus
        enablesReturnKeyAutomatically
        autoCorrect={false}
        placeholder={STRINGS.placeholder.shoutBox}
        placeholderTextColor={COLORS.asphaltGray200}
        textAlignVertical='top'
        keyboardType='twitter'
        value={value}
        onChangeText={setValue}
        onSubmitEditing={onSubmitHandler}
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
          onPress={onSubmitHandler}
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

export default ShoutBox;
