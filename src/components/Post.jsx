import { Link } from "react-router-dom";

export default function Post({ titulo, body, id }) {
  const usuarioLogueado = JSON.parse(localStorage.getItem("userLogin"));

  const isAdmin = usuarioLogueado?.isAdmin;
  return (
    <article
      className={`w-[250px] h-[300px] flex flex-col justify-center items-center overflow-hidden border border-gray-500 ${
        isAdmin && "cursor-pointer"
      }`}
    >
      <h1 className="text-[#8e8A8C] font-semibold text-2xl max-w-[200px] text-center truncate ">
        {titulo}
      </h1>
      <p className="max-w-[200px] text-sm text-center">{body}</p>
      {isAdmin && <Link to={`/editPost/${id}`}>Editar</Link>}
    </article>
  );
}
