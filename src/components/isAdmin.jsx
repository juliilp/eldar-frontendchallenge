import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import useUser from "../hooks/useUser";

export default function isAdmin() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogueado = JSON.parse(localStorage.getItem("userLogin"));
    if (usuarioLogueado && usuarioLogueado.isAdmin === false) {
      setUser(JSON.parse(usuarioLogueado));
      navigate("/");
    }
  }, [navigate, setUser]);

  return <Outlet></Outlet>;
}
