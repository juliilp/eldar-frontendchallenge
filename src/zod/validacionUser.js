import { object, string } from "zod";

const validacionUser = object({
  email: string().email({ message: "Email no válido" }),
  password: string().min(1, { message: "La contraseña no puede estar vacía" }),
});

export default validacionUser;
