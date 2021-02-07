import React, { useState } from 'react';
import { World, ActivityOverlay, OnboardingButtons } from 'library/components';

const OnboardingScreen = () => {
  const [authLoading, setAuthLoading] = useState(false);

  return (
    <World >
      <ActivityOverlay showOverlay={authLoading} />
      <OnboardingButtons setAuthLoading={setAuthLoading} authLoading={authLoading} />
    </World>
  );
};

export default OnboardingScreen;
