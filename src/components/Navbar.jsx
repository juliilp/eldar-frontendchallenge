import { useEffect } from "react";
import useUser from "../hooks/useUser";
import Desktop from "./Navbar/Desktop";
import Mobile from "./Navbar/Mobile";

export default function Navbar() {
  const { setUser } = useUser();
  const handlerCerrarSession = () => {
    localStorage.removeItem("userLogin");
    setUser(null);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem("userLogin"));
      setUser(storedUser);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setUser]);
  return (
    <>
      <Mobile handlerCerrarSession={handlerCerrarSession} />
      <Desktop handlerCerrarSession={handlerCerrarSession} />
    </>
  );
}
