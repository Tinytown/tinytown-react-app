import React from 'react';

export default (ChildComponent) => {
  const ComposedComponent = (props) => {
    if (props.waitFor) {
      return <ChildComponent {...props} />;
    }
    return null;
  };

  return ComposedComponent;
};
