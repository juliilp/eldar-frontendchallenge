import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Navbar() {
  const { user } = useUser();
  console.log(user);
  const handlerCerrarSession = () => {
      localStorage.removeItem("userLogin")
  }
  return (
    <header>
       {user ? (
          <ul>
            <button onClick={handlerCerrarSession} >Cerrar sesion</button>
            <li>{user.nombre}</li>
          </ul>
        ) : (
          <ul>
            <li><Link to="/login" >Login</Link></li>
            <li><Link to="/registro" >Registro</Link></li>
          </ul>
        )}
    </header>
  );
}
