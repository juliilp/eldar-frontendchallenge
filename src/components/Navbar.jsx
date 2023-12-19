import useUser from "../hooks/useUser";
export default function Navbar() {
  const { user } = useUser();
  console.log(user);
  return <header>hola</header>;
}
