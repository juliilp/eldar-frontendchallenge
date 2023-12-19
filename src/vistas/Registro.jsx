import React, { useState } from "react";

export default function Login() {
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

    const usuariosExistentes = JSON.parse(localStorage.getItem("allUsers")) ?? [
      {
        nombre: "admin",
        descripcion: "Soy descripcion de admin",
        edad: "soy edad",
        email: "admin123@gmail.com",
        password: "123456",
        isAdmin: true,
      },
    ];

    const usuariosActualizados = [...usuariosExistentes, dataUser];
    localStorage.setItem("allUsers", JSON.stringify(usuariosActualizados));
  };

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
    </>
  );
}
