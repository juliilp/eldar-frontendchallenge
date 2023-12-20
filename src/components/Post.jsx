import { Link } from "react-router-dom";
import axios from "axios";
export default function Post({ titulo, body, id }) {
  const usuarioLogueado = JSON.parse(localStorage.getItem("userLogin"));

  const isAdmin = usuarioLogueado?.isAdmin;

  const handlerBorrarPost = async () => {
    
    if(isAdmin) return alert("No podes borrar siendo admin")
    
    try {
      const result = await axios.delete(`/posts/${id}`) 
      console.log(result)
      if(result.status === 200) {
        alert(`¡Card ${id} borrada!`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <article
      className={`w-[300px] h-[300px] flex flex-col justify-between py-6 items-center overflow-hidden border border-gray-500 }`}
    >
      <h1 className="text-[#8e8A8C] font-semibold text-2xl max-w-[250px] text-center truncate ">
        {titulo}
      </h1>
      <p className="max-w-[200px] text-sm text-center">{body}</p>
      {isAdmin && (
        <Link className="border border-black py-2 px-6" to={`/editPost/${id}`}>
          Editar
        </Link>
      )}
      <button onClick={handlerBorrarPost} >Borrar Post</button>
    </article>
  );
}
