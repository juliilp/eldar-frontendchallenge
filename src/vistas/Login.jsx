import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
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
      //Por las dudas, en el caso que tenga usuario, que lo setee
      setUser(JSON.parse(usuarioLogueado));
      navigate("/");
    }
  }, [navigate, setUser]);  

  const handlerSubmit = (e) => {
    e.preventDefault();
    const allUsersString = localStorage.getItem("allUsers");
    const allUsers = JSON.parse(allUsersString);
    const findUser = allUsers.find((user) => user.email === dataUser.email);

    // Errores super descriptivos para testearlos que funcionan bien
    if (!findUser) {
      return alert("Email incorrecto");
    }

    if (findUser.password !== dataUser.password) {
      return alert("Password incorrecta");
    }

    localStorage.setItem("userLogin", JSON.stringify(findUser));
    // Que me setee el usuario encontrado para refrescar la redireccion
    setUser(findUser);
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
