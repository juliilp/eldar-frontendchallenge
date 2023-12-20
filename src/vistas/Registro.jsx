import React, { useEffect, useState } from "react";
import { string, object, boolean } from 'zod';
import userSchema from "../zod/validacionUser";

const Login = () => {
  const [errorValidation, setErrorValidation] = useState(null);
  const [dataUser, setDataUser] = useState({
    nombre: "",
    descripcion: "",
    edad: "",
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
      userSchema.parse(dataUser);
      const usuariosExistentes = JSON.parse(localStorage.getItem("allUsers"));
      const usuariosActualizados = [...usuariosExistentes, dataUser];
      localStorage.setItem("allUsers", JSON.stringify(usuariosActualizados));
    } catch (error) {
      setErrorValidation(error.errors)
    }
  };

  //Use éste formato para no repetir tanto código de html
  const datosUser = [
    {
      span: "nombre",
      name: "nombre",
      type: "text",
      value: dataUser.nombre,
      placeholder: "Escribe tu nombre...",
    },
    {
      span: "descripcion",
      name: "descripcion",
      type: "text",
      value: dataUser.descripcion,
      placeholder: "Escribe tu descripcion...",
    },
    {
      span: "edad",
      name: "edad",
      type: "text",
      value: dataUser.edad,
      placeholder: "Escribe tu edad",
    },
    {
      span: "email:",
      name: "email",
      type: "email",
      value: dataUser.email,
      placeholder: "Escribe tu email",
    },
    {
      span: "password:",
      name: "password",
      type: "password",
      value: dataUser.password,
      placeholder: "Escribe tu password...",
    },
  ];

  /// Hace que los errores de las validaciones se borren despues de 3 segundos
  useEffect(() => {
    if(errorValidation?.length > 0) {
      const timer = setTimeout(() => {
        setErrorValidation(null)
      }, 3000)
     return () => clearTimeout(timer)
    }
  },[errorValidation])

  return (
    <>
      <form>
        {datosUser.map((d, index) => {
          return (
            <article key={index}>
              <span>{d.span}</span>
              <input
                type={d.type}
                name={d.name}
                onChange={onChangeRegistro}
                value={d.value}
                placeholder={d.placeholder}
              />
            </article>
          );
        })}
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
