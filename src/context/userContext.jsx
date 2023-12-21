import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const allUsers = localStorage.getItem("allUsers")

    if(!allUsers) {
      localStorage.setItem("allUsers", JSON.stringify([
        {
          nombre: "admin",
          email: "admin123@gmail.com",
          password: "123456",
          isAdmin: true,
        },
      ]))
    }
  }, [])

  const valueProvider = {
    setUser,
    user
  }

  useEffect(() => {
    const findUser = JSON.parse(localStorage.getItem("userLogin"));
    if (findUser) {
      setUser(findUser);
    }
  },[])
  return <UserContext.Provider value={valueProvider}>{children}</UserContext.Provider>;
}
