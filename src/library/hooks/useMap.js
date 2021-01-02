import { useEffect, useReducer, useState } from 'react';
import { storeMultiple, getMultiple } from 'library/apis/storage';
import store from 'rdx/store';

export default (cameraRef, mapRef, updateUserVisible) => {
  const [mapRendered, setMapRendered] = useState(false);
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const cameraBounds = mapRef?.state.region?.properties.visibleBounds;
  const { location: { user, goToUser, userVisible }, app: { active } } = store.getState();

  // Map Camera
  const cameraReducer = (state, action) => {
    switch (action.type) {
    case 'update_center':
      return { ...state, center: action.payload };
    case 'update_bounds':
      return { ...state, bounds: action.payload };
    case 'update_zoom':
      return { ...state, zoom: action.payload };
    case 'update_moved':
      return { ...state, movedByUser: action.payload };
    default:
      return state;
    }
  };

  const [camera, dispatch] = useReducer(cameraReducer, {
    center: [-93.26392, 44.98459],
    bounds: null,
    zoom: 12.83,
    movedByUser: false,
  });

  const setCamera = ({ center, bounds, zoom, movedByUser }) => {
    center && dispatch({ type: 'update_center', payload: center });
    bounds && dispatch({ type: 'update_bounds', payload: bounds });
    zoom && dispatch({ type: 'update_zoom', payload: zoom });
    movedByUser !== null && dispatch({ type: 'update_moved', payload: movedByUser });
  };

  // Move camera to location
  useEffect(() => {
    if (goToUser) {
      cameraRef?.flyTo(user, 1000);
      setCamera({
        center: user,
        zoom: 12,
        movedByUser: false });
    }
  }, [goToUser]);

  // Check if user is off screen
  const updateUserVisibility = (bounds) => {
    const isUserVisible = (
      user[0] < bounds[0][0] &&
      user[0] > bounds[1][0] &&
      user[1] < bounds[0][1] &&
      user[1] > bounds[1][1]);
    isUserVisible !== userVisible && updateUserVisible(isUserVisible);
  };

  // Handle camera change
  const regionChangeHandler = async ({ properties, geometry }) => {
    if (properties.isUserInteraction) {
      setCamera({
        center: geometry.coordinates,
        bounds: properties.visibleBounds,
        zoom: properties.zoomLevel,
        movedByUser: true,
      });
      updateUserVisibility(properties.visibleBounds);
    }
  };

  // Handle user location change
  const shouldUpdate = (user && !goToUser && cameraBounds);

  useEffect(() => {
    shouldUpdate && updateUserVisibility(cameraBounds);
  }, [user]);

  // Map Storage
  const shouldStore = (!active && user);

  useEffect(() => {
    let isMounted = true;

    if (!dataRetrieved) {
      getMultiple(['cameraCenter', 'cameraZoom', 'userVisible']).then((data) => {
        if (isMounted && data.cameraCenter) {
          setCamera({
            center: data.cameraCenter,
            zoom: data.cameraZoom,
            movedByUser: false,
          });
          updateUserVisible(data.userVisible);
          setDataRetrieved(true);
        }
      });
    }

    if (shouldStore) {
      const data = [
        ['userLocation', user],
        ['cameraCenter', camera.center],
        ['cameraZoom', camera.zoom],
        ['userVisible', userVisible],
      ];
      storeMultiple(data);
    }

    return () => {
      isMounted = false;
    };
  }, [shouldStore]);

  return [camera, regionChangeHandler, mapRendered, setMapRendered];
};
