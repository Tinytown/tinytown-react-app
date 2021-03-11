import { useEffect, useReducer, useState, useRef } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { mapConfig } from 'library/components/Map';
import { storeMultiple, getMultiple } from 'library/apis/storage';

export default (cameraRef, updateUserVisible) => {
  const [mapRendered, setMapRendered] = useState(false);
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const {
    user: userLocation,
    goToUser,
    cameraTarget,
    userVisible,
  } = useSelector((state) => state.location);

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

  const debouncedStoreCamera = useRef(_.debounce((center, zoom) => {
    storeMultiple([
      ['cameraCenter', center],
      ['cameraZoom', zoom],
    ]);
  }, 1000, { leading: false, trailing: true }));

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
  const regionChangeHandler = async ({
    properties: { visibleBounds, zoomLevel, isUserInteraction },
    geometry: { coordinates },
  }) => {
    setCamera({
      center: coordinates,
      bounds: visibleBounds,
      zoom: zoomLevel,
      movedByUser: true,
    });
    debouncedStoreCamera.current(coordinates, zoomLevel);
    if (isUserInteraction) {
      checkOnScreen(visibleBounds);
    }
  };

  // handle user location change, first launch, and storage retrieval
  useEffect(() => {
    let isMounted = true;

    if (!userLocation && dataRetrieved && userVisible === null) {
      // first launch
      updateUserVisible(false);
    } else if (userLocation && camera.bounds && !goToUser) {
      // user moves
      checkOnScreen(camera.bounds);
    }

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

    return () => { isMounted = false; };
  }, [userLocation, dataRetrieved]);

  useEffect(() => {

  }, [camera]);

  return [camera, regionChangeHandler, mapRendered, setMapRendered];
};
