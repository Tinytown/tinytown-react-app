import React from 'react';
import PropTypes from 'prop-types';

const withWait = (ChildComponent) => {
  const ComposedComponent = ({ waitFor, ...props }) => waitFor && <ChildComponent {...props} />;
  return ComposedComponent;
};

withWait.propTypes = {
  waitFor: PropTypes.bool,
};

withWait.defaultProps = {
  waitFor: false,
};

export default withWait;
