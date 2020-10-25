import { bound } from './@@data/function';

const bindMethods = (functionNames, thisRef) => Object.assign(thisRef, Object.fromEntries(
  functionNames.map((method) => [method, bound(method, thisRef)])
));

export {
  bindMethods,
};
