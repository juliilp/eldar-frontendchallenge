import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
export default function Post({ titulo, body, id }) {
  const usuarioLogueado = JSON.parse(localStorage.getItem("userLogin"));

  const isAdmin = usuarioLogueado?.isAdmin;

  const handlerBorrarPost = async () => {
    if (isAdmin) return alert("No podes borrar siendo admin");

    try {
      const result = await axios.delete(`/posts/${id}`);
      console.log(result);

      Swal.fire({
        title: "¿Estas seguro de borrar la card?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: "success",
            title: `¡Card ${id} borrada!`,
            text: 'En consola está el objeto "borrado" ',
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const editTexto = body.split("").splice(0, 125).join("");
  return (
    <article
      className={` w-full max-w-[350px] h-[450px] ,d:h-[400px] flex flex-col  gap-3 py-4 shadow-xl items-center justify-center  border-gray-500 rounded-lg }`}
    >
      <h1 className="font-bold text-xl w-[250px] md:w-[285px] text-center truncate  px-4">
        {titulo}
      </h1>
      <img
        src={`https://picsum.photos/id/${id + 150}/200/150`}
        alt="imagen"
        loading="lazy"
      />
      <p className="max-w-[200px] text-xs text-center">{editTexto}</p>
      <div className="flex gap-6 items-center justify-center flex-col md:flex-row">
        {isAdmin && (
          <Link
            className="rounded-lg py-2 px-10 font-bold bg-[rgb(74,142,204)] text-white"
            to={`/editPost/${id}`}
          >
            Editar
          </Link>
        )}
        <button
          onClick={handlerBorrarPost}
          className="rounded-lg  py-2 px-10 font-bold bg-[rgb(74,142,204)] text-white"
        >
          Borrar Post
        </button>
      </div>
    </article>
  );
}
