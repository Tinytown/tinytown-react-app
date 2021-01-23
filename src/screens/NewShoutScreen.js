import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavBar, Scrim } from 'library/components';
import { SHAPES, COLORS } from 'res';

const NewShoutScreen = ({ navigation }) => {
  return (
    <>
      <Scrim onPress={() => navigation.goBack()} />
      <View style={{
        backgroundColor: COLORS.justWhite,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 400,
        paddingTop: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        ...SHAPES.elevGray2,
      }} >

        <NavBar label='' onClose={() => navigation.goBack()} />
      </View>
    </>

  );
};

const styles = StyleSheet.create({});

export default NewShoutScreen;
