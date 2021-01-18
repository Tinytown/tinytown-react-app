import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { storeMultiple, getMultiple } from 'library/apis/storage';

export default (cameraRef, mapRef, updateUserVisible) => {
  const [mapRendered, setMapRendered] = useState(false);
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const cameraBounds = mapRef?.state.region?.properties.visibleBounds;
  const userLocation = useSelector((state) => state.location.user);
  const goToUser = useSelector((state) => state.location.goToUser);
  const userVisible = useSelector((state) => state.location.userVisible);
  const appActive = useSelector((state) => state.app.active);

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
      cameraRef?.flyTo(userLocation, 1000);
      setCamera({
        center: userLocation,
        zoom: 12,
        movedByUser: false });
    }
  }, [goToUser]);

  // Check if user is off screen
  const updateUserVisibility = (bounds) => {
    if (!userLocation) {
      userVisible !== false && updateUserVisible(false);
    } else {
      const visibilityCheck = (
        userLocation[0] < bounds[0][0] &&
        userLocation[0] > bounds[1][0] &&
        userLocation[1] < bounds[0][1] &&
        userLocation[1] > bounds[1][1]);
      visibilityCheck !== userVisible && updateUserVisible(visibilityCheck);
    }
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
  const shouldUpdate = (!goToUser && cameraBounds);

  useEffect(() => {
    shouldUpdate || !userLocation && updateUserVisibility(cameraBounds);
  }, [userLocation]);

  // Load / store map state
  const shouldStore = (!appActive && userLocation);

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
        ['userLocation', userLocation],
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
