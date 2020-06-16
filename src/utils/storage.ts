import { error } from "console";

export const getFromStorage = <T = any>(key: string): T => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return undefined;
  }
};

export const setToStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
