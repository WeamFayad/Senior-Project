import { local } from "../helpers/localstorage";
import { useEffect, useState } from "react";

export const useLogin = (trigger) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const localToken = local("token");

    setToken(localToken);
  }, [trigger]);

  return [token !== null && token !== undefined && token !== "", token];
};
