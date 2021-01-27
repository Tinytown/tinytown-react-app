import React from 'react';
import { View, TextInput, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import IconButton from './IconButton';
import { useNewShout } from 'library/hooks';
import { COLORS, TYPOGRAPHY, SHAPES, STRINGS, normalizeStyles } from 'res';

const ShoutBox = ({ onSubmit }) => {
  const [value, setValue, limitChip] = useNewShout();
  const styles = generateStyles(limitChip);

  return (
    <View style={styles.container} >
      <TextInput
        style={styles.input}
        multiline
        autoFocus
        enablesReturnKeyAutomatically
        autoCorrect={false}
        placeholder={STRINGS.placeholder.shoutBox}
        placeholderTextColor={COLORS.sidewalkGray}
        textAlignVertical='top'
        keyboardType='twitter'
        value={value}
        onChangeText={setValue}
        onSubmitEditing={() => onSubmit(value)}
      />
      <View style={styles.btnContainer} >
        <Animated.View style={[styles.limitChip, limitChip.animation]} >
          <Text style={styles.limitLabel}>{limitChip.string}</Text>
        </Animated.View>
        <IconButton
          icon='megaphone'
          theme='super red'
          onPress={() => onSubmit(value)}
          disabled={limitChip.disabled}
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
      backgroundColor: COLORS.snowGray,
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
    limitChip: {
      backgroundColor: disabled ? COLORS.bubblegumRed600 : COLORS.justWhite,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginRight: 12,
      borderRadius: SHAPES.radiusAll,
      opacity: show ? 1 : 0,
      justifyContent: 'center',
      alignItems: 'center',
      ...SHAPES.elevGray5,
    },
    limitLabel: {
      color: disabled ? COLORS.justWhite : COLORS.bubblegumRed600,
      textAlign: 'right',
      ...TYPOGRAPHY.overline3,
    },
  });
};

export default ShoutBox;
