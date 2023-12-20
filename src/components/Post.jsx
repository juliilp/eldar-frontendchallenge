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
  const editTexto = body.split("").splice(0,125).join("")
  return (
    <article
      className={`w-[350px] h-[400px] flex flex-col  gap-3 py-6 items-center overflow-hidden border-dashed border-2 border-gray-500 }`}
    >
      <h1 className="text-[#8e8A8C] font-semibold text-2xl max-w-[250px] text-center truncate ">
        {titulo}
      </h1>
      <img src={`https://picsum.photos/id/${id}/200/150`} alt="imagen" />
      <p className="max-w-[200px] text-xs text-center">{editTexto}</p>
    <div className="flex gap-6 items-center justify-center" >
    {isAdmin && (
        <Link className="border border-black py-2 px-6" to={`/editPost/${id}`}>
          Editar
        </Link>
      )}
      <button onClick={handlerBorrarPost} >Borrar Post</button>
    </div>
    </article>
  );
}
