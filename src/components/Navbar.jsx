import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useEffect } from "react";

export default function Navbar() {
  const { user, setUser } = useUser();

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

  const handlerCerrarSession = () => {
    localStorage.removeItem("userLogin");
    setUser(null);
  };
  return (
    <header>
      {user ? (
        <ul>
          <button onClick={handlerCerrarSession}>Cerrar sesion</button>
          <li>{user.nombre}</li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/registro">Registro</Link>
          </li>
        </ul>
      )}
    </header>
  );
}
