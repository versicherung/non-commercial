export const isArray = (val: unknown): boolean => {
  return Object.prototype.toString.call(val) === '[object Array]';
};

export const isObject = (val: unknown): boolean => {
  return Object.prototype.toString.call(val) === '[object Object]';
};

export const isString = (val: unknown): boolean => {
  return Object.prototype.toString.call(val) === '[object String]';
};

export const isSSR = (() => {
  try {
    return !(typeof window !== 'undefined' && document !== undefined);
  } catch (e) {
    return true;
  }
})();
