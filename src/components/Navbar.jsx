import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function Navbar() {
  const { user } = useUser();
  console.log(user);
  return (
    <header>
       {user ? (
          <ul>
            <button>Cerrar sesion</button>
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
