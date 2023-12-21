import React, { useEffect, useState } from "react";
import { string, object, boolean } from "zod";
import userSchema from "../zod/validacionUser";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Login = () => {
  const navigate = useNavigate();
  const [errorValidation, setErrorValidation] = useState(null);
  const [dataUser, setDataUser] = useState({
    nombre: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const onChangeRegistro = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    try {
      // Validacion con zod
      const allUsers = JSON.parse(localStorage.getItem("allUsers"));
      const findUser = allUsers.find((user) => user.email === dataUser.email);
      userSchema.parse(dataUser);
      if (findUser)
        return Swal.fire({
          icon: "error",
          title: "Ya existe alguien con ese email",
        });
      const usuariosExistentes = JSON.parse(localStorage.getItem("allUsers"));
      const usuariosActualizados = [...usuariosExistentes, dataUser];
      localStorage.setItem("allUsers", JSON.stringify(usuariosActualizados));
      Swal.fire({
        icon: "success",
        title: "Usuario creado con éxito",
      });
      navigate("/login");
    } catch (error) {
      setErrorValidation(error.errors);
    }
  };

  //Use éste formato para no repetir tanto código de html
  const datosUser = [
    {
      span: "Nombre",
      name: "nombre",
      type: "text",
      value: dataUser.nombre,
      placeholder: "Escribe tu nombre...",
    },
    {
      span: "Email",
      name: "email",
      type: "email",
      value: dataUser.email,
      placeholder: "email@gmail.com",
    },
    {
      span: "Password",
      name: "password",
      type: "password",
      value: dataUser.password,
      placeholder: "**************",
    },
  ];

  /// Hace que los errores de las validaciones se borren despues de 3 segundos
  useEffect(() => {
    if (errorValidation?.length > 0) {
      const timer = setTimeout(() => {
        setErrorValidation(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorValidation]);

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center mt-8 md:mt-0">
      <h1 className="text-4xl font-bold text-center md:text-5xl ">
        Crea un usuario
      </h1>
      <p className="text-sm text-center dark:text-gray-400 my-10">
        ¿Ya tenes una cuenta?
        <Link to="/login" className=" pl-4 focus:underline hover:underline">
          Ingresa aqui
        </Link>
      </p>
      <form>
        {datosUser.map((d, index) => {
          return (
            <article key={index}>
              <span className="block text-sm">{d.span}</span>
              <input
                type={d.type}
                name={d.name}
                onChange={onChangeRegistro}
                value={d.value}
                placeholder={d.placeholder}
                className="rounded w-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium focus:ring-0 focus:border-gray-200 focus:bg-gray200"
              />
            </article>
          );
        })}
        <button
          onClick={handlerSubmit}
          className="w-full px-8 py-3 font-semibold bg-black text-white hover:bg-zinc-800 transition-colors rounded"
        >
          Registrarme
        </button>
      </form>
      {errorValidation && (
        <article style={{ color: "red" }}>
          {errorValidation.map((error, index) => (
            <p key={index}>{error.message}</p>
          ))}
        </article>
      )}
    </main>
  );
};

export default Login;
