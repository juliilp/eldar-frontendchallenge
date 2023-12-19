import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const findUser = JSON.parse(localStorage.getItem("userLogin"));
    if (findUser) {
      setUser(findUser);
    }
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
