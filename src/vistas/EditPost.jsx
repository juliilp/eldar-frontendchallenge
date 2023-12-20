import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function EditPost() {
  const navigate = useNavigate();
  const [inputEdit, setInputEdit] = useState({
    title: "",
    body: "",
  });
  const { id } = useParams();

  const handlerSubmit = async (e) => {
    e.preventDefault();

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
        console.log(result)
        alert("Editado con éxito");
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
    <>
      <form onSubmit={handlerSubmit} >
        <article>
          <span>title</span>
          <input type="text" name="title" onChange={handlerOnChange} />
        </article>
        <article>
          <span>body</span>
          <input type="text" name="body" onChange={handlerOnChange} />
        </article>
        <button>Editar</button>
      </form>
    </>
  );
}
