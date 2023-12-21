import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
export default function EditPost() {
  const navigate = useNavigate();
  const [inputEdit, setInputEdit] = useState({
    title: "",
    body: "",
  });
  const { id } = useParams();

  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (inputEdit.title.length < 3)
      return Swal.fire({
        icon: "error",
        title: "Inserte al menos en el titulo 4 letras",
      });

    if (inputEdit.body.length < 3)
      return Swal.fire({
        icon: "error",
        title: "Inserte al menos en el body 4 letras",
      });
    try {
      const result = await axios.put(
        `/posts/${id}`,
        {
          title: inputEdit.title,
          body: inputEdit.body,
        },
        { headers: { "Content-type": "application/json; charset=UTF-8" } }
      );

      if (result.status === 200) {
        console.log(result);
        Swal.fire({
          title: "¡Editado con éxito!",
          text: "¡El resultado está en la consola! :)",
          icon: "success",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerOnChange = (e) => {
    setInputEdit({
      ...inputEdit,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="w-full h-screen flex justify-center items-center flex-col ">
      <h1 className="text-5xl font-bold text-center my-8">¡Edita tu post!</h1>
      <form onSubmit={handlerSubmit} className="flex flex-col gap-8">
        <article>
          <span className="block text-sm">Title</span>
          <input
            type="text"
            name="title"
            onChange={handlerOnChange}
            className="rounded w-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium focus:ring-0 focus:border-gray-200 focus:bg-gray200"
          />
        </article>
        <article>
          <span className="block text-sm">Body</span>
          <input
            type="text"
            name="body"
            onChange={handlerOnChange}
            className="rounded w-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium focus:ring-0 focus:border-gray-200 focus:bg-gray200"
          />
        </article>
        <button className="w-full px-8 py-3  font-semibold bg-black text-white hover:bg-zinc-800 transition-colors rounded">
          Editar Post
        </button>
      </form>
    </main>
  );
}
