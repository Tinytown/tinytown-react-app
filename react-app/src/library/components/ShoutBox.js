import React, { useContext } from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import { Config } from 'context';
import IconButton from './IconButton';
import Chip from './Chip';
import { COLORS, TYPOGRAPHY, normalizeStyles } from 'res';

const ShoutBox = ({
  shoutBoxProps,
  onSubmit = () => {},
  onFocus = () => {},
}) => {
  const { STRINGS } = useContext(Config.Context);
  const { shoutString, setShoutString, chipString, chipAnimation, showChip, disabled } = shoutBoxProps;
  const styles = generateStyles({ showChip });

  return (
    <View style={styles.container} >
      <TextInput
        style={styles.input}
        multiline
        autoFocus
        enablesReturnKeyAutomatically
        autoCorrect={true}
        autoCapitalize='sentences'
        placeholder={STRINGS.shouts.shoutBox}
        placeholderTextColor={COLORS.asphaltGray200}
        textAlignVertical='top'
        keyboardType='twitter'
        value={shoutString}
        onChangeText={setShoutString}
        onSubmitEditing={onSubmit}
        onFocus={onFocus}
      />
      <View style={styles.btnContainer} >
        <Animated.View style={[styles.chipContainer, chipAnimation]} >
          <Chip
            label={chipString}
            theme={disabled ? 'lt-red-floating' : 'lt-white-hairline'}
            animationType={null}
            ripple={false}
          />
        </Animated.View>
        <IconButton
          icon='megaphone'
          theme='lt-red-floating'
          onPress={onSubmit}
          disabled={disabled}
        />
      </View>
    </View>
  );
};

const generateStyles = ({ showChip }) => {
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
      opacity: showChip ? 1 : 0,
    },
  });
};

ShoutBox.propTypes = {
  controlledInput: PropTypes.object,
  onSubmit: PropTypes.func,
  onFocus: PropTypes.func,
};

export default ShoutBox;
