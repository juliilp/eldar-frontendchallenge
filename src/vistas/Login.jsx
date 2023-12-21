import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import validacionUser from "../zod/validacionUser";
import Swal from "sweetalert2";
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
    if (errorValidation?.length > 0) {
      const timer = setTimeout(() => {
        setErrorValidation(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorValidation]);
  const handlerSubmit = (e) => {
    e.preventDefault();
    try {
      validacionUser.parse(dataUser);

      setErrorValidation(null);

      const allUsers = JSON.parse(localStorage.getItem("allUsers"));
      const findUser = allUsers.find((user) => user.email === dataUser.email);

      if (!findUser)
        return Swal.fire({
          icon: "error",
          title: "Email incorrecto",
          text: "Coloca un email existente",
        });

      if (findUser.password !== dataUser.password)
        return Swal.fire({
          icon: "error",
          title: "Password incorrecta",
        });

      localStorage.setItem("userLogin", JSON.stringify(findUser));
      setUser(findUser);
      Swal.fire({
        icon: "success",
        title: "¡Has iniciado sesion con éxito!",
      });

      navigate("/");
    } catch (error) {
      // Ocurrió un error de validación
      setErrorValidation(error.errors);
    }
  };

  return (
    <section className="pt-[15vh] flex justify-center items-center h-screen flex-col">
      <h1 className="text-5xl font-bold text-center ">Ingresa a tu cuenta</h1>
      <p className="text-sm text-center dark:text-gray-400 my-10">
        ¿No tenes cuenta?
        <Link to="/registro" className=" pl-4 focus:underline hover:underline">
          Ingresa aqui
        </Link>
      </p>
      <form className="flex flex-col gap-6 justify-center items-center h-[300px] max-w-[350px]">
        <article>
          {errorValidation && (
            <span className="block text-sm bg-red-500 p-2 text-white rounded-sm my-2">
              {errorValidation[0].message}
            </span>
          )}
          <span className="block text-sm">Email</span>
          <input
            type="email"
            onChange={onChangeLogin}
            value={dataUser.email}
            placeholder="ejemplo@gmail.com"
            name="email"
            autoFocus
            className="rounded w-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium focus:ring-0 focus:border-gray-200 focus:bg-gray200"
          />
        </article>
        <article>
          <span className="block text-sm">Contraseña</span>
          <input
            type="password"
            onChange={onChangeLogin}
            value={dataUser.password}
            placeholder="************"
            name="password"
            className="rounded w-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium focus:ring-0 focus:border-gray-200 focus:bg-gray200"
          />
        </article>

        <button
          onClick={handlerSubmit}
          className="w-full px-8 py-3 font-semibold bg-black text-white hover:bg-zinc-800 transition-colors rounded"
        >
          Ingresar
        </button>
      </form>
    </section>
  );
};

export default Login;
