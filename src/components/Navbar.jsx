import useUser from "../hooks/useUser";
export default function Navbar() {
  const { user } = useUser();
  console.log(user);
  return (
    <header>
      <ul>
        {user ? (
          <li>
            <button>Cerrar sesion</button>
            <li>{user.nombre}</li>
          </li>
        ) : (
          <>
            <li>Login</li>
            <li>Registro</li>
          </>
        )}
      </ul>
    </header>
  );
}
