import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { storeMultiple, getMultiple } from 'library/apis/storage';

export default (cameraRef, updateUserVisible) => {
  const [mapRendered, setMapRendered] = useState(false);
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const userLocation = useSelector((state) => state.location.user);
  const goToUser = useSelector((state) => state.location.goToUser);
  const userVisible = useSelector((state) => state.location.userVisible);
  const appActive = useSelector((state) => state.app.active);
  const INITIAL_ZOOM = 12.285641625082706;
  const DEFAULT_ZOOM = 13.2;
  const DEFAULT_COORDS = [-70.09716612969417, 41.30054837367213];

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
    center: DEFAULT_COORDS,
    bounds: null,
    zoom: INITIAL_ZOOM,
    movedByUser: false,
  });

  const setCamera = ({ center, bounds, zoom, movedByUser }) => {
    center && dispatch({ type: 'update_center', payload: center });
    bounds && dispatch({ type: 'update_bounds', payload: bounds });
    zoom && dispatch({ type: 'update_zoom', payload: zoom });
    movedByUser !== null && dispatch({ type: 'update_moved', payload: movedByUser });
  };

  // Move camera to user location
  useEffect(() => {
    if (goToUser) {
      cameraRef?.setCamera({
        centerCoordinate: userLocation,
        zoomLevel: DEFAULT_ZOOM,
        animationDuration: 1000,
        heading: 0,
      });
      setCamera({
        center: userLocation,
        zoom: DEFAULT_ZOOM,
        movedByUser: false });
    }
  }, [goToUser]);

  // Check if user is off screen
  const checkOnScreen = (bounds) => {
    if (userLocation) {
      const onScreen = (
        userLocation[0] < bounds[0][0] &&
        userLocation[0] > bounds[1][0] &&
        userLocation[1] < bounds[0][1] &&
        userLocation[1] > bounds[1][1]);
      onScreen !== userVisible && updateUserVisible(onScreen);
    }
  };

  // Handle camera change
  const regionChangeHandler = async ({ properties, geometry }) => {
    setCamera({
      center: geometry.coordinates,
      bounds: properties.visibleBounds,
      zoom: properties.zoomLevel,
      movedByUser: true,
    });
    if (properties.isUserInteraction) {
      checkOnScreen(properties.visibleBounds);
    }
  };

  // Handle user location change and first launch
  useEffect(() => {
    if (!userLocation && dataRetrieved && userVisible === null) {
      // First launch
      updateUserVisible(false);
    } else if (userLocation && camera.bounds && !goToUser) {
      // User moves
      checkOnScreen(camera.bounds);
    }
  }, [userLocation, dataRetrieved]);

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
        }
        setDataRetrieved(true);
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

    return () => { isMounted = false; };
  }, [shouldStore]);

  return [camera, regionChangeHandler, mapRendered, setMapRendered, DEFAULT_ZOOM];
};
