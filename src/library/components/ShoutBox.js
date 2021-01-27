import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text } from 'react-native';
import _ from 'lodash';
import Animated from 'react-native-reanimated';
import IconButton from './IconButton';
import { useAnimation } from 'library/hooks';
import { COLORS, TYPOGRAPHY, SHAPES, STRINGS, normalizeStyles } from 'res';

const ShoutBox = ({ onSubmit }) => {
  const CHAR_LIMIT = 80;
  const CHAR_WARNING = 10;

  const [shoutString, setShoutString] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [animation, animate] = useAnimation('bounce');
  const debouncedBounce = useRef(_.debounce(animate, 400, { leading: true, trailing: false })); // 10/10 func name

  const styles = generateStyles({ showWarning, disabled });

  useEffect(() => {
    const charsLeft = CHAR_LIMIT - shoutString.length;
    if (charsLeft >= 0 && charsLeft <= CHAR_WARNING) {
      setDisabled(false);
      setShowWarning(true);
    } else if (charsLeft < 0) {
      setDisabled(true);
      setShowWarning(true);
      debouncedBounce.current();
    } else {
      setShowWarning(false);
      setDisabled(false);
    }
  }, [shoutString]);

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
        value={shoutString}
        onChangeText={setShoutString}
        onSubmitEditing={() => onSubmit(shoutString)}
      />
      <View style={styles.btnContainer} >
        <Animated.View style={[styles.counter, animation]} >
          <Text style={styles.counterLabel}>{`${shoutString.length} / ${CHAR_LIMIT}`}</Text>
        </Animated.View>
        <IconButton
          icon='megaphone'
          theme='super red'
          onPress={() => onSubmit(shoutString)}
          disabled={disabled}
        />
      </View>
    </View>
  );
};

const generateStyles = ({ showWarning, disabled }) => {
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
    counter: {
      backgroundColor: disabled ? COLORS.bubblegumRed600 : COLORS.justWhite,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginRight: 12,
      borderRadius: SHAPES.radiusAll,
      opacity: showWarning ? 1 : 0,
      justifyContent: 'center',
      alignItems: 'center',
      ...SHAPES.elevGray5,
    },
    counterLabel: {
      color: disabled ? COLORS.justWhite : COLORS.bubblegumRed600,
      textAlign: 'right',
      ...TYPOGRAPHY.overline3,
    },
  });
};

export default ShoutBox;
