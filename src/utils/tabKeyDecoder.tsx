export const tabKeyDecoder = (key: string) => {
  const keySeparatorIndex = key.indexOf("-");
  return {
    type: key.slice(0, keySeparatorIndex),
    value: key.slice(keySeparatorIndex + 1),
  };
};
