import { useEffect, useReducer } from 'react';

export default () => {
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
    center ? dispatch({ type: 'update_center', payload: center }) : null;
    bounds ? dispatch({ type: 'update_bounds', payload: bounds }) : null;
    zoom ? dispatch({ type: 'update_zoom', payload: zoom }) : null;
    movedByUser !== null ? dispatch({ type: 'update_moved', payload: movedByUser }) : null;
  };

  // Move camera to location
  const flyTo = (trigger, location, cameraRef) => {
    useEffect(() => {
      let isMounted = true;
      if (trigger && isMounted) {
        cameraRef?.flyTo(location, 1000);
        setCamera({
          center: location,
          zoom: 12,
          movedByUser: false });
      }
      return () => {
        isMounted = false;
      };
    }, [trigger]);
  };

  const onCameraCheck = (userLocation, cameraBounds) => {
    const isUserLocationWithinCamera = (
      userLocation[0] < cameraBounds[1][0] ||
      userLocation[0] > cameraBounds[0][0] ||
      userLocation[1] > cameraBounds[0][1] ||
      userLocation[1] < cameraBounds[1][1]);

    if (isUserLocationWithinCamera) {
      return false;
    }
    return true;
  };

  return [camera, setCamera, onCameraCheck, flyTo];
};
