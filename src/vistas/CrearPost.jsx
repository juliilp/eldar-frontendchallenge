import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function CrearPost() {
  const navigate = useNavigate();
  const [createPost, setCreatePost] = useState({
    title: "",
    body: "",
    userId: Date.now(),
  });
  const handlerSubmit = async (e) => {
    e.preventDefault();
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
      console.log(result.data);
      alert("Post creado");
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
    <>
      <form onSubmit={handlerSubmit}>
        <article>
          <span>titulo:</span>
          <input type="text" name="title" onChange={onChangePost} />
        </article>
        <article>
          <span>body:</span>
          <input type="text" name="body" onChange={onChangePost} />
        </article>
        <button type="submit">Crear post</button>
      </form>
    </>
  );
}
