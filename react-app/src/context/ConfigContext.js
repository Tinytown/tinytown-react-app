import React, { useState, useEffect, createContext } from 'react';
import remoteConfig from '@react-native-firebase/remote-config';
import { STRINGS as LOCAL_STRINGS } from 'res';

const Context = createContext();

const Provider = ({ children }) => {
  const [value, setValue] = useState(null);

  const fetchRemoteConfig = async () => {
    try {
      await remoteConfig().setDefaults({ ENV: {}, STRINGS: JSON.stringify(LOCAL_STRINGS) });
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

export default { Context, Provider };
