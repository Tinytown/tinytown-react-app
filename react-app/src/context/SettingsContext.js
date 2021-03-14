
import React, { useState, useEffect, createContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { getIds } from 'library/apis/auth';

const INITIAL_VALUE = {
  notifications: false,
  backgroundGeo: false,
};

const Context = createContext();

const Provider = ({ children }) => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const [settings, setSettings] = useState(INITIAL_VALUE);

  // fetch firestore collection
  useEffect(() => {
    if (isSignedIn) {
      deviceRef.get()
        .then((doc) => {
          const { settings } = doc.data();
          setSettings(settings);
        })
        .catch((error) => console.log(error));
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    return (
      <Context.Provider value={{ settings }}>
        {children}
      </Context.Provider>
    );
  }

  const { uid, deviceId } = getIds();
  const deviceRef = firestore().collection('users')
    .doc(uid)
    .collection('devices')
    .doc(deviceId);

  const updateSetting = (key, value) => {
    setSettings((currentValue) => {
      currentValue[key] = value;
      return { ...currentValue };
    });
    deviceRef.update({ [`settings.${key}`]: value });
  };

  return (
    <Context.Provider value={{ settings, updateSetting }}>
      {children}
    </Context.Provider>
  );
};

export default { Context, Provider, INITIAL_VALUE };
