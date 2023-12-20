import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
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
    <header className="flex fixed top-0 items-center h-16 w-full bg-white px-6 justify-between z-50 ">
      {user ? (
        <div className="flex items-center gap-2">
          <FaUser />
          <h2>{user?.nombre ? user.nombre : "Sin nombre"}</h2>
        </div>
      ) : (
        <div>
          <h2>Jsonplaceholder</h2>
        </div>
      )}

      {user ? (
        <ul className="flex gap-6">
          {user.isAdmin && (
            <>
              <li>
                <Link to="/crearpost">Crear post</Link>
              </li>
              <li>
                <button onClick={handlerCerrarSession}>Cerrar sesion</button>
              </li>
            </>
          )}
        </ul>
      ) : (
        <ul className="flex gap-6">
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
