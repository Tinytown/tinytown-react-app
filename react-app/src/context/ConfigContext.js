import React, { useState, useEffect, createContext } from 'react';
import remoteConfig from '@react-native-firebase/remote-config';
import { STRINGS as LOCAL_STRINGS } from 'res';

const INITIAL_VALUE = {
  ENV: null,
  STRINGS: LOCAL_STRINGS,
};

const Context = createContext();

const Provider = ({ children }) => {
  const [value, setValue] = useState(INITIAL_VALUE);

  const fetchRemoteConfig = async () => {
    try {
      await remoteConfig().setDefaults({ ...JSON.stringify(INITIAL_VALUE) });
      await remoteConfig().fetchAndActivate();
      const { ENV, STRINGS } = remoteConfig().getAll();
      setValue({ ENV: JSON.parse(ENV.asString()), STRINGS: JSON.parse(STRINGS.asString()) });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRemoteConfig();
  }, []);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default { Context, Provider, INITIAL_VALUE };
