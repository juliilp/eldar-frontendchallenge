import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import PostLoading from "../components/PostLoading";
import usePosts from "../hooks/usePosts";
import axios from 'axios'
export default function Home() {
  const [searchFilter, setSearchFilter] = useState("")
  const {
    isError,
    handlerVerMas,
    handlerAvanzarPagina,
    handlerRetrocederPagina,
    page,
    allPosts,
    setAllPosts,
    search
  } = usePosts();

  if (isError) return <span>Error.. algo anda mal</span>;

  const pageDisabled = page > 1 ? false : true;

  const onChangeSearchFilter = (e) => {
    setSearchFilter(e.target.value)
  }

  const handlerSearch = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.get(
        `/posts?q=${searchFilter}`
      );

      return setAllPosts(result.data);
      
    } catch (error) {
      console.log("Error al traer los posts: " + error);
      throw error;
    }
  };
  return (
    <main className="w-full flex justify-center items-center flex-col px-24 mt-[15vh] ">
      <form onSubmit={handlerSearch} >
      <input type="text" name="search" placeholder="Busqueda..."  onChange={onChangeSearchFilter} />
      <button  >Buscar</button>
      </form>
      <section className="w-full h-full   grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-12">
        {allPosts.map(({ title, body, id }, key) => {
          return <Post titulo={title} body={body} id={id} key={key} />;
        })}
      </section>
      <article className="flex flex-col">
        <div className="flex gap-6">
          <button
            onClick={handlerRetrocederPagina}
            disabled={pageDisabled}
            className={`border border-black py-2 px-6 ${
              pageDisabled && "bg-red-600"
            }`}
          >
            Retroceder
          </button>
          <button onClick={handlerAvanzarPagina}>Avanzar</button>
        </div>
        <button onClick={handlerVerMas} type="button">
          Ver más posts
        </button>
      </article>
    </main>
  );
}
