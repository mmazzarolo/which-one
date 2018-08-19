import { StorageKey } from "../types/StorageKey";

const setItem = (key: StorageKey, value: string) => {
  localStorage.setItem(key, value);
};

const getItem = (key: StorageKey) => {
  return localStorage.getItem(key);
};

export default {
  setItem,
  getItem
};
