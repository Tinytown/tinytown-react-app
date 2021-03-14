import { Platform } from 'react-native';
import { getStrings } from 'res';

export const getOnboardingShout = (userLocation) => {
  const STRINGS = getStrings();

  return {
    coordinates: [userLocation[0] - 0.005, userLocation[1] + 0.005],
    createdAt: Date.now(),
    id: 'shoutOnboarding',
    localId: 1000,
    text: STRINGS.onboarding.shoutIntro.title,
    sourcePlatform: Platform.OS,
    system: true,
    state: 'active',
  };
};
