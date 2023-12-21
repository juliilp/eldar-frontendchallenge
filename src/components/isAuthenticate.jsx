import { Outlet, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import React, { useEffect } from "react";

export default function isAuthenticate() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    const usuarioLogueado = localStorage.getItem("userLogin");
    if (usuarioLogueado) {
      //Por las dudas, en el caso que tenga usuario, que lo setee
      setUser(JSON.parse(usuarioLogueado));
      navigate("/");
    }
  }, [navigate, setUser]);
  return <Outlet></Outlet>;
}
