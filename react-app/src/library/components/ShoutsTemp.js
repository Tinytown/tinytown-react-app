import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useShouts } from 'library/hooks';

const shoutsTemp = React.memo(({ userLocation }) => {
  const [shouts] = useShouts(userLocation);

  if (!shouts) {
    return null;
  }

  return (
    <FlatList
      data={shouts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <View style={{ width: 80, height: 24, backgroundColor: 'white' }} >
            <Text>{item.text}</Text>
          </View>
        );
      }}
    />
  );
});

export default shoutsTemp;
