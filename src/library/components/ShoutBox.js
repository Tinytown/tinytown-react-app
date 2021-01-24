import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import IconButton from './IconButton';
import { COLORS, TYPOGRAPHY, normalizeStyles } from 'res';

const ShoutBox = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container} >
      <TextInput
        style={styles.input}
        multiline
        autoFocus
        autoCorrect={false}
        placeholder='LOUD NOISES!'
        textAlignVertical='top'
        value={value}
        onChangeText={setValue}
      />
      <IconButton
        icon='megaphone'
        theme='super red'
        wrapperStyle={styles.shoutBtn}
        onPress={() => onSubmit(value)}
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
