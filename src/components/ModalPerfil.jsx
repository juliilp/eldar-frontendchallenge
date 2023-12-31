import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useUser from "../hooks/useUser";

export default function ModalPerfil({ switchModal, closeModal }) {
  const [newNombre, setNewNombre] = useState("");
  const usuarioLogueado = JSON.parse(localStorage.getItem("userLogin"));
  const allUsers = JSON.parse(localStorage.getItem("allUsers"));
  const { user, setUser } = useUser();
  const handlerSubmit = (e) => {
    e.preventDefault();
    if (!usuarioLogueado)
      return Swal.fire({
        icon: "error",
        title: "Acceso denegado",
      });
    if (newNombre.length < 3)
      return Swal.fire({
        icon: "error",
        title: "Minimo 3 letras",
      });
    if (newNombre.length > 7) {
      return Swal.fire({
        icon: "error",
        title: "Elegí un nombre mas corto",
      });
    }
    const newUser = {
      nombre: newNombre,
      email: usuarioLogueado.email,
      password: usuarioLogueado.password,
    };

    Swal.fire({
      icon: "success",
      title: "¡Nombre cambiado con éxito!",
    });
    closeModal();
    // Actualizando los datos en ambos keys del local storage
    const findUser = allUsers.filter((e) => e.email !== usuarioLogueado.email);
    localStorage.setItem("allUsers", JSON.stringify([...findUser, newUser]));
    localStorage.setItem("userLogin", JSON.stringify(newUser));
    setUser(newUser);
  };

  const onChangeNewNombre = (e) => {
    setNewNombre(e.target.value);
  };

  useEffect(() => {
    document.body.style.overflow = switchModal ? "hidden" : "visible";
  }, [switchModal]);
  return (
    <>
      {switchModal && (
        <section className="  fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <article className="bg-white p-16 rounded shadow-md flex items-center justify-center flex-col w-[95%] sm:w-full max-w-[450px] ">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Escribi tu nuevo nombre
            </h2>
            <form
              onSubmit={handlerSubmit}
              className="flex justify-center items-center"
            >
              <input
                type="text"
                onChange={onChangeNewNombre}
                className="focus:border-gray-200 focus:bg-gray200 font-medium block py-2 pl-4 w-[250px] outline-none "
                placeholder="Escribe tu nuevo nombre.."
              />
              <button>Enviar</button>
            </form>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={closeModal}
            >
              Cerrar Modal
            </button>
            
          </article>
        </section>
      )}
    </>
  );
}
