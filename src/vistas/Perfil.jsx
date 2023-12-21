import { useState } from "react";
import ModalPerfil from "../components/ModalPerfil";
export default function Perfil() {
  const [switchModal, setSwitchModal] = useState(false);
  const usuarioLogueado = JSON.parse(localStorage.getItem("userLogin"));

  const handlerModal = () => setSwitchModal((prev) => !prev);
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-6">
      <h1 className="text-5xl font-bold">Mi perfil</h1>
      <button
        className="rounded-lg py-[10px] px-10 font-bold bg-[rgb(74,142,204)] text-white"
        onClick={handlerModal}
      >
        Editar mi nombre
      </button>
      <ModalPerfil switchModal={switchModal} closeModal={handlerModal} />
      <article className="flex gap-2 items-center flex-col">
        <strong className="text-sm">Mi nombre</strong>
        <span>{usuarioLogueado.nombre}</span>
      </article>
      <article className="flex gap-2 items-center flex-col">
        <strong className="text-sm">Mi email</strong>
        <span>{usuarioLogueado.email}</span>
      </article>
    </main>
  );
}
