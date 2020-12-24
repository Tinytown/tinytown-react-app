import { useEffect } from 'react';
import { storeMultiple, getMultiple } from 'library/apis/storage';

export default (callback) => {
  useEffect(() => {
    let isMounted = true;
    getMultiple(['cameraCenter', 'cameraZoom', 'userVisible']).then((data) => {
      if (isMounted && data) {
        callback(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const storeData = (camera, props) => {
    const data = [
      ['userLocation', props.userLocation],
      ['cameraCenter', camera.center],
      ['cameraZoom', camera.zoom],
      ['userVisible', props.userVisible],
    ];
    storeMultiple(data);
  };

  return [storeData];
};

