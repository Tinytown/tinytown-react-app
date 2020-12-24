import { useEffect, useReducer, useState } from 'react';
import { storeMultiple, getMultiple } from 'library/apis/storage';

export default (props, cameraRef, mapRef) => {
  const [mapRendered, setMapRendered] = useState(false);

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
    center ? dispatch({ type: 'update_center', payload: center }) : null;
    bounds ? dispatch({ type: 'update_bounds', payload: bounds }) : null;
    zoom ? dispatch({ type: 'update_zoom', payload: zoom }) : null;
    movedByUser !== null ? dispatch({ type: 'update_moved', payload: movedByUser }) : null;
  };

  // Move camera to location
  useEffect(() => {
    if (props.goToUser) {
      cameraRef?.flyTo(props.userLocation, 1000);
      setCamera({
        center: props.userLocation,
        zoom: 12,
        movedByUser: false });
    }
  }, [props.goToUser]);

  // Check if user is off screen
  const onCameraCheck = (userLocation, cameraBounds) => {
    const isUserLocationOutsideCamera = (
      userLocation[0] < cameraBounds[1][0] ||
      userLocation[0] > cameraBounds[0][0] ||
      userLocation[1] > cameraBounds[0][1] ||
      userLocation[1] < cameraBounds[1][1]);

    if (isUserLocationOutsideCamera) {
      return false;
    }
    return true;
  };

  const updateUserVisibility = (visibleBounds) => {
    if (props.isSignedIn) {
      const isVisible = onCameraCheck(props.userLocation, visibleBounds);
      isVisible !== props.userVisible ? props.updateUserVisible(isVisible) : null;
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
  useEffect(() => {
    if (props.userLocation && mapRef) {
      mapRef.getVisibleBounds()
        .then(updateUserVisibility)
        .catch((err) => console.log(err));
    }
  }, [props.userLocation]);

  // Map Storage
  const shouldStore = (!props.appState.active && props.userLocation);
  const [dataRetrieved, setDataRetrieved] = useState(false);

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
          props.updateUserVisible(data.userVisible);
          setDataRetrieved(true);
        }
      });
    }

    if (shouldStore) {
      const data = [
        ['userLocation', props.userLocation],
        ['cameraCenter', camera.center],
        ['cameraZoom', camera.zoom],
        ['userVisible', props.userVisible],
      ];
      storeMultiple(data);
    }

    return () => {
      isMounted = false;
    };
  }, [shouldStore]);

  return [camera, regionChangeHandler, mapRendered, setMapRendered];
};
