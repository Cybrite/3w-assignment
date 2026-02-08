import { LOCAL_STORAGE_KEYS } from "../constants";

export const saveUser = (user) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
};

export const loadUser = () => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    }
  }
  return null;
};

export const removeUser = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
};
