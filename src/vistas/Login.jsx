import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { string} from "zod";
import useUser from "../hooks/useUser";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [errorValidation, setErrorValidation] = useState(null);
  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });

  const onChangeLogin = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };

  /// Hace que los errores de las validaciones se borren despues de 3 segundos
  useEffect(() => {
    if(errorValidation?.length > 0) {
      const timer = setTimeout(() => {
        setErrorValidation(null)
      }, 3000)
     return () => clearTimeout(timer)
    }
  },[errorValidation])
  const handlerSubmit = (e) => {
    e.preventDefault();
    try {
      const emailValidation = string().email({message:"Escribi un email válido"});
      const passwordValidation = string().min(5, {message:"Password minimo 5 caracteres"}).max(10, {message:"Password maximo 10 caracteres"});

      emailValidation.parse(dataUser.email);
      passwordValidation.parse(dataUser.password);

      setErrorValidation(null);

      const allUsers = JSON.parse(localStorage.getItem("allUsers"));
      const findUser = allUsers.find((user) => user.email === dataUser.email);

      if (!findUser) return alert("Email incorrecto");
      
      if (findUser.password !== dataUser.password) return alert("Password incorrecta");
      
      localStorage.setItem("userLogin", JSON.stringify(findUser));
      setUser(findUser);
      alert("Logueado con éxito");
      navigate("/");
    } catch (error) {
      // Ocurrió un error de validación
      setErrorValidation(error.errors);
    }
  };

  return (
    <>
      <form>
        <article>
          <span>Email:</span>
          <input
            type="email"
            onChange={onChangeLogin}
            value={dataUser.email}
            placeholder="Escribe tu email.."
            name="email"
          />
        </article>
        <article>
          <span>Contraseña:</span>
          <input
            type="password"
            onChange={onChangeLogin}
            value={dataUser.password}
            placeholder="Escribe tu contraseña..."
            name="password"
          />
        </article>

        <button onClick={handlerSubmit}>Enviar</button>
      </form>
      {errorValidation && (
        <article style={{ color: "red" }}>
          {errorValidation.map((error, index) => (
            <p key={index}>{error.message}</p>
          ))}
        </article>
      )}
    </>
  );
};

export default Login;
