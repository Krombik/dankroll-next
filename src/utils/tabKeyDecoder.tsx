export const tabKeyDecoder = (key: string) => {
  const keySeparatorIndex = key.indexOf("-");
  if (keySeparatorIndex === -1) return { type: key, value: "" };
  return {
    type: key.slice(0, keySeparatorIndex),
    value: key.slice(keySeparatorIndex + 1),
  };
};
