import React, { useState } from 'react';
import { WorldMap, ActivityOverlay, OnboardingButtons } from 'library/components';

const OnboardingScreen = () => {
  const [authLoading, setAuthLoading] = useState(false);

  return (
    <WorldMap>
      <ActivityOverlay showOverlay={authLoading} />
      <OnboardingButtons setAuthLoading={setAuthLoading} authLoading={authLoading} />
    </WorldMap>
  );
};

export default OnboardingScreen;
