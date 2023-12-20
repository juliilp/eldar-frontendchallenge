import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import usePosts from "../hooks/usePosts";
import axios from 'axios'
export default function Navbar() {
  const { user, setUser } = useUser();
  const { setAllPosts, page, limit, search, allPosts } = usePosts();
  const [inputSearch, setInputSearch] = useState("");
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

  const handlerSearch = async (e) => {
    e.preventDefault();

    try {
      console.log(inputSearch)
      const result = await axios.get(
        `/posts?${search && `?q=${inputSearch}`}`
      );

      console.log(result.data)
        const newPosts = result.data.filter((e) => e.title.includes(inputSearch))
        console.log(newPosts)

      return setAllPosts(newPosts);
      
    } catch (error) {
      console.log("Error al traer los posts: " + error);
      throw error;
    }
  };
  return (
    <header className="flex fixed top-0 items-center h-16 w-full bg-white px-6 justify-between ">
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

      <form className="flex gap-4" onSubmit={handlerSearch}>
        <input
          type="text"
          onChange={onChangeSearch}
          name="search"
          value={inputSearch}
          className="border border-black outline-none"
        />
        <button type="submit">Enviar</button>
      </form>

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
