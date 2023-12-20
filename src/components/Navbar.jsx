import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useEffect, useState } from "react";
export default function Navbar() {
  const { user, setUser } = useUser();
  // const [inputSearch, setInputSearch] = useState("");
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

  const onChangeSearch = (e) => {
    setInputSearch(e.target.value);
  };

  return (
    <header>
      {user ? (
        <ul>
          <button onClick={handlerCerrarSession}>Cerrar sesion</button>
          <li>{user.nombre ? user.nombre : "Sin nombre"}</li>
          {user.isAdmin && (
            <>
              <li>
                <Link to="/crearpost">Crear post</Link>
              </li>
            </>
          )}
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
      {/* <input type="text" onChange={onChangeSearch} name="search" /> */}
      {/* <button onClick={() => handlerSearch(inputSearch)}>Enviar</button>
      <button onClick={handlerVerMas}>Ver más posts</button> */}
    </header>
  );
}
