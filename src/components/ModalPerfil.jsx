import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ModalPerfil({ switchModal, closeModal }) {
  const [newNombre, setNewNombre] = useState("");
  const usuarioLogueado = JSON.parse(localStorage.getItem("userLogin"));
  const handlerSubmit = (e) => {
    e.preventDefault();
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
      text: "Actualiza la pagina para ver los cambios",
    });
    closeModal();
    localStorage.setItem("userLogin", JSON.stringify(newUser));
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
        <article className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-16 rounded shadow-md flex items-center justify-center flex-col ">
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
                className="focus:border-gray-200 focus:bg-gray200 font-medium block py-2 pl-4 w-[250px] "
                placeholder="Escribe tu nuevo nombre.."
              />
            </form>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={closeModal}
            >
              Cerrar Modal
            </button>
          </div>
        </article>
      )}
    </>
  );
}
