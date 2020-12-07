import { useReducer } from 'react';

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
  }
  
  const [camera, dispatch] = useReducer(cameraReducer, { 
    center: [-93.26392, 44.98459],
    bounds: null,
    zoom: 12.83,
    movedByUser: false,
  });

  const setCamera = ({ center, bounds, zoom, movedByUser }) => {
    center ? dispatch({ type: 'update_center', payload: center }) : null
    bounds ? dispatch({ type: 'update_bounds', payload: bounds }) : null
    zoom ? dispatch({ type: 'update_zoom', payload: zoom }) : null
    movedByUser !== null ? dispatch({ type: 'update_moved', payload: movedByUser }) : null
  };
  
  return [camera, setCamera]
}