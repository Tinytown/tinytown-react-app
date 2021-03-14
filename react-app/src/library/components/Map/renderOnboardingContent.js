import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import * as turf from '@turf/turf';
import mapConfig from './config';
import { Config } from 'context';
import { TYPOGRAPHY, SHAPES, IMAGES, normalizeStyles } from 'res';

const { SymbolLayer, MarkerView, ShapeSource } = MapboxGL;
const {
  RAFT_COORD,
  WELCOME_COORD,
} = mapConfig;

export const renderWelcomeSign = (onboarding) => {
  const { COLORS, STRINGS } = useContext(Config.Context);

  if (!onboarding) {
    return;
  }

  const styles = normalizeStyles({
    welcomeSign: {
      position: 'absolute',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 20,
      backgroundColor: COLORS.basics.justWhite,
      borderTopLeftRadius: SHAPES.radiusLg,
      borderTopRightRadius: SHAPES.radiusLg,
      borderBottomRightRadius: SHAPES.radiusSm,
      borderBottomLeftRadius: SHAPES.radiusLg,
      ...SHAPES.elevGray2,
    },
    title: {
      color: COLORS.asphaltGray[800],
      ...TYPOGRAPHY.display3,
    },
    subtitle: {
      marginTop: 4,
      marginBottom: 8,
      color: COLORS.asphaltGray[300],
      ...TYPOGRAPHY.brandedButton,
    },
  });

  raftShape = turf.point(RAFT_COORD);

  return (
    <View>
      <MarkerView
        id='welcomeSign'
        coordinate={WELCOME_COORD}
      >
        <View style={styles.welcomeSign} >
          <Text style={styles.subtitle} >{STRINGS.onboarding.welcome}</Text>
          <Text style={styles.title}>Tinytown</Text>
        </View>
      </MarkerView>
      <ShapeSource
        id="onboardingRaft"
        shape={raftShape}
      >
        <SymbolLayer
          id='onboardingRaftImg'
          style={{
            iconImage: IMAGES.oobRaft,
            iconSize: 0.4,
          }}
        />
      </ShapeSource>
    </View>
  );
};

