export const isPlainObj = (value: unknown): boolean => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  // These `in` checks must traverse the prototype chain (e.g. to detect Map/Set), so Object.hasOwn()
  // (own-properties-only) would be a behavior regression here.
  return (
    (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) &&
    // eslint-disable-next-line unicorn/no-computed-property-existence-check
    !(Symbol.toStringTag in value) &&
    // eslint-disable-next-line unicorn/no-computed-property-existence-check
    !(Symbol.iterator in value)
  );
};
