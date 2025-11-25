/* eslint-disable @typescript-eslint/no-explicit-any */
export const returnTrueElementOrUndefined = (test: boolean, object?: any) => {
  if (test) {
    if (!!object) {
      return object as typeof object;
    }
    return true;
  }
  return undefined;
};
