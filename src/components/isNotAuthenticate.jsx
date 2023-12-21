import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function isNotAuthenticate() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    const usuarioLogueado = localStorage.getItem("userLogin");
    if (!usuarioLogueado) {
      navigate("/");
    }
  }, [navigate, setUser]);

  return <Outlet></Outlet>;
}
