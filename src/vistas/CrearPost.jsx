import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function CrearPost() {
  const usuarioLogueado = JSON.parse(localStorage.getItem("userLogin"));
  const isAdmin = usuarioLogueado?.isAdmin;
  const navigate = useNavigate();
  const [createPost, setCreatePost] = useState({
    title: "",
    body: "",
    userId: Date.now(),
  });
  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin)
      return Swal.fire({
        icon: "error",
        title: "Solo los admins editar posts",
      });

    if (createPost.title.length < 4)
      return Swal.fire({
        icon: "error",
        title: "Inserte al menos en el titulo 4 letras",
      });

    if (createPost.body.length < 4)
      return Swal.fire({
        icon: "error",
        title: "Inserte al menos en el body 4 letras",
      });

    const result = await axios.post(
      "/posts",
      {
        title: createPost.title,
        body: createPost.body,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    if (result.status === 201) {
      console.log(result);
      Swal.fire({
        icon: "success",
        title: "Post creado, info en la consola :)",
      });

      return navigate("/");
    }
  };

  const onChangePost = (e) => {
    setCreatePost({
      ...createPost,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <main className="w-full h-screen flex justify-center items-center flex-col">
      <h1 className="text-5xl font-bold text-center my-8">¡Crea tu post!</h1>
      <form onSubmit={handlerSubmit} className="flex flex-col gap-8">
        <article>
          <span className="text-sm block">Titulo</span>
          <input
            type="text"
            name="title"
            onChange={onChangePost}
            placeholder="Escribí el titulo..."
            className="rounded w-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium focus:ring-0 focus:border-gray-200 focus:bg-gray200"
          />
        </article>
        <article>
          <span className="text-sm block">Body</span>
          <input
            type="text"
            name="body"
            onChange={onChangePost}
            placeholder="Escribí el body.."
            className="rounded w-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium focus:ring-0 focus:border-gray-200 focus:bg-gray200"
          />
        </article>
        <button
          type="submit"
          className="w-full px-8 py-3 font-semibold bg-black text-white hover:bg-zinc-800 transition-colors rounded"
        >
          Crear post
        </button>
      </form>
    </main>
  );
}
