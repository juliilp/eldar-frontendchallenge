import {  object, string } from "zod";

const validacionUser = object({
    email: string().email({ message: "email no válido" }),
    password: string().min(1, { message: "La contraseña no puede estar vacía" }),
  });

  export default validacionUser