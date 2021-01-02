import React from 'react';

export default (ChildComponent) => {
  const ComposedComponent = ({ waitFor, ...props }) => waitFor && <ChildComponent {...props} />;
  return ComposedComponent;
};
