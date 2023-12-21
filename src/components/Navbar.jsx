import { useEffect } from "react";
import useUser from "../hooks/useUser";
import Desktop from "./Navbar/Desktop";
import Mobile from "./Navbar/Mobile";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const handlerCerrarSession = () => {
    localStorage.removeItem("userLogin");
    navigate("/");
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
