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
      <article className="flex items-center gap-6">
        {user && (
          <div className="flex items-center gap-2">
            <FaUser />
            <h2 className="text-xl font-semibold">
              {user?.nombre ? user.nombre : "Sin nombre"}
            </h2>
          </div>
        )}
        <Link
          className="rounded-lg py-[10px] px-10 font-bold bg-[rgb(74,142,204)] text-white"
          to="/"
        >
          Ir a Inicio
        </Link>
      </article>

      {user ? (
        <ul className="flex gap-6 items-center">
          {user.isAdmin && (
            <>
              <li>
                <Link
                  to="/crearpost"
                  className="rounded-lg py-[10px] px-10 font-bold bg-[rgb(74,142,204)] text-white"
                >
                  Crear post
                </Link>
              </li>
              <li>
                <button
                  onClick={handlerCerrarSession}
                  className="rounded-lg py-2 px-10 font-bold bg-[rgb(74,142,204)] text-white"
                >
                  Cerrar sesion
                </button>
              </li>
            </>
          )}
        </ul>
      ) : (
        <ul className="flex gap-6">
          <li>
            <Link
              to="/login"
              className="rounded-lg py-[10px] px-10 font-bold bg-[rgb(74,142,204)] text-white"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/registro"
              className="rounded-lg py-[10px] px-10 font-bold bg-[rgb(74,142,204)] text-white"
            >
              Registro
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
