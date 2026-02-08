import { useState, useCallback } from "react";
import { saveUser, loadUser, removeUser } from "../utils/storage";

export const useAuth = () => {
  const [user, setUser] = useState(() => loadUser());
  const [status, setStatus] = useState({ loading: false, error: "" });

  const persistUser = useCallback((nextUser) => {
    setUser(nextUser);
    if (nextUser) {
      saveUser(nextUser);
    } else {
      removeUser();
    }
  }, []);

  return {
    user,
    persistUser,
    status,
    setStatus,
  };
};
