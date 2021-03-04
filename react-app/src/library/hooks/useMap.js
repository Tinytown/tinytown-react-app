import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { mapConfig } from 'library/components/Map';
import { storeMultiple, getMultiple } from 'library/apis/storage';

export default (cameraRef, updateUserVisible) => {
  const [mapRendered, setMapRendered] = useState(false);
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const userLocation = useSelector((state) => state.location.user);
  const goToUser = useSelector((state) => state.location.goToUser);
  const cameraTarget = useSelector((state) => state.location.cameraTarget);
  const userVisible = useSelector((state) => state.location.userVisible);
  const appActive = useSelector((state) => state.app.active);

  const { INITIAL_ZOOM, DEFAULT_ZOOM, TIGHT_ZOOM, DEFAULT_COORDS } = mapConfig;

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

  // move camera to user location
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

  // move camera to target location
  useEffect(() => {
    if (cameraTarget) {
      cameraRef?.setCamera({
        centerCoordinate: cameraTarget,
        zoomLevel: TIGHT_ZOOM,
        animationDuration: 1000,
        heading: 0,
      });
      setCamera({
        center: cameraTarget,
        zoom: TIGHT_ZOOM,
        movedByUser: false });
    }
  }, [cameraTarget]);

  // check if user is off screen
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

  // handle camera change
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

  // handle user location change and first launch
  useEffect(() => {
    if (!userLocation && dataRetrieved && userVisible === null) {
      // first launch
      updateUserVisible(false);
    } else if (userLocation && camera.bounds && !goToUser) {
      // user moves
      checkOnScreen(camera.bounds);
    }
  }, [userLocation, dataRetrieved]);

  // load / store map state
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

  return [camera, regionChangeHandler, mapRendered, setMapRendered];
};
