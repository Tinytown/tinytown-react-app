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

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (err) {
    console.log(err)
  }
}

export const getMultiple = async (arr) => {
  try {
    const responseArr = await AsyncStorage.multiGet(arr);
    const parsedArr = responseArr.map(set => [set[0], JSON.parse(set[1])])
    return Object.fromEntries(parsedArr)
  } catch (err) {
    console.log(err)
    return undefined;
  }
};

export const storeMultiple = async (arr) => {
  arr.forEach(async (set) => {
    try {
      const jsonValue = JSON.stringify(set[1])
      await AsyncStorage.setItem(set[0], jsonValue)
    } catch (err) {
      console.log(err)
    }
  })
}

export const clearStorage = async () => {
  const storageKeys = ['userLocation', 'cameraCenter', 'cameraZoom']
  try {
    await AsyncStorage.multiRemove(storageKeys)
  } catch(err) {
    console.log(err)
  }
}