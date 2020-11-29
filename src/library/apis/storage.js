import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null
  } catch (err) {
    console.log(err)
    return undefined;
  }
};

export const storeData = async (value, key) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (err) {
    console.log(err)
  }
}

export const clearStorage = async () => {
  const storageKeys = ['userLocation', 'staticMap']
  try {
    await AsyncStorage.multiRemove(storageKeys)
  } catch(err) {
    console.log(err)
  }
}