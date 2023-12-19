import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
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

  useEffect(() => {
    const usuarioLogueado = localStorage.getItem("userLogin");
    if (usuarioLogueado) {
      navigate("/");
    }
  }, []);
  const handlerSubmit = (e) => {
    e.preventDefault();
    const allUsersString = localStorage.getItem("allUsers");
    const allUsers = JSON.parse(allUsersString);
    const findUser = allUsers.find((user) => user.email === dataUser.email);

    // Errores descriptivos para mostrarle la lógica
    if (!findUser) {
      return alert("Email incorrecto");
    }
    // Si encuentra el usuario, que lo guarde en el local storage, si no, que guarde null
    if (findUser.password !== dataUser.password) {
      return alert("Password incorrecta");
    }
    localStorage.setItem("userLogin", JSON.stringify(findUser));
    alert("Logueado con éxito");
    navigate("/");
  };

  const datosUser = [
    {
      span: "email:",
      type: "email",
      value: dataUser.email,
      placeholder: "Escribe tu email",
    },
    {
      span: "password:",
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
                name={d.type}
                onChange={onChangeLogin}
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
