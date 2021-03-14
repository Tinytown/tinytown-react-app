import React, { useState, useEffect, createContext } from 'react';
import remoteConfig from '@react-native-firebase/remote-config';
import { STRINGS as LOCAL_STRINGS, COLORS as LOCAL_COLORS } from 'res';

const INITIAL_VALUE = {
  COLORS: LOCAL_COLORS,
  STRINGS: LOCAL_STRINGS,
  ENV: null,
};

const Context = createContext();

const Provider = ({ children }) => {
  const [value, setValue] = useState(INITIAL_VALUE);

  const fetchRemoteConfig = async () => {
    try {
      await remoteConfig().setDefaults({ ...JSON.stringify(INITIAL_VALUE) });
      await remoteConfig().fetchAndActivate();
      const { COLORS, STRINGS, ENV  } = remoteConfig().getAll();
      setValue({
        COLORS: JSON.parse(COLORS.asString()),
        STRINGS: JSON.parse(STRINGS.asString()),
        ENV: JSON.parse(ENV.asString()),
      });
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
