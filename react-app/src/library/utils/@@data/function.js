const bound = (methodName, obj) => obj[methodName].bind(obj);

export {
  bound,
};
