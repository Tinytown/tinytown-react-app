import React from 'react';
import { View, TextInput, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import IconButton from './IconButton';
import { useNewShout } from 'library/hooks';
import { COLORS, TYPOGRAPHY, SHAPES, STRINGS, normalizeStyles } from 'res';

const ShoutBox = ({ onSubmit }) => {
  const [value, setValue, limitIndicator, createNewShout] = useNewShout();
  const styles = generateStyles(limitIndicator);

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
        <Animated.View style={[styles.chipContainer, limitIndicator.animation]} >
          <Text style={styles.chipLabel}>{limitIndicator.string}</Text>
        </Animated.View>
        <IconButton
          icon='megaphone'
          theme='super red'
          onPress={onSubmitHandler}
          disabled={limitIndicator.disabled}
        />
      </View>
    </View>
  );
};

const generateStyles = ({ show, disabled }) => {
  return normalizeStyles({
    container: {
      paddingTop: 16,
      paddingBottom: 50,
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
      bottom: 24,
      right: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chipContainer: {
      backgroundColor: disabled ? COLORS.bubblegumRed400 : COLORS.justWhite,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginRight: 12,
      borderRadius: SHAPES.radiusAll,
      opacity: show ? 1 : 0,
      justifyContent: 'center',
      alignItems: 'center',
      ...SHAPES.elevGray5,
    },
    chipLabel: {
      color: disabled ? COLORS.justWhite : COLORS.bubblegumRed400,
      textAlign: 'right',
      ...TYPOGRAPHY.overline3,
    },
  });
};

export default ShoutBox;
