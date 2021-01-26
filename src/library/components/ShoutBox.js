import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import IconButton from './IconButton';
import { COLORS, TYPOGRAPHY, normalizeStyles } from 'res';

const ShoutBox = ({ onSubmit }) => {
  const [shoutString, setShoutString] = useState('');
  const [shoutLength, setShoutLength] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const CHAR_LIMIT = 80;

  useEffect(() => {
    setShoutLength(shoutString.length);
  }, [shoutString]);

  useEffect(() => {
    if (shoutLength >= CHAR_LIMIT) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [shoutLength]);

  return (
    <View style={styles.container} >
      <TextInput
        style={styles.input}
        multiline
        autoFocus
        enablesReturnKeyAutomatically
        autoCorrect={false}
        placeholder='LOUD NOISES!'
        placeholderTextColor={COLORS.sidewalkGray}
        textAlignVertical='top'
        keyboardType='twitter'
        value={shoutString}
        onChangeText={setShoutString}
        onSubmitEditing={() => onSubmit(shoutString)}
      />
      <IconButton
        icon='megaphone'
        theme='super red'
        wrapperStyle={styles.shoutBtn}
        onPress={() => onSubmit(shoutString)}
        disabled={disabled}
      />
    </View>
  );
};

const styles = normalizeStyles({
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
  shoutBtn: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
});

export default ShoutBox;
