import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import PostLoading from "../components/PostLoading";
import usePosts from "../hooks/usePosts";
import axios from "axios";
export default function Home() {
  const [searchFilter, setSearchFilter] = useState("");
  const {
    handlerVerMas,
    handlerAvanzarPagina,
    handlerRetrocederPagina,
    page,
    allPosts,
    setAllPosts,
    limit,
  } = usePosts();

  const onChangeSearchFilter = (e) => setSearchFilter(e.target.value);

  const handlerSearch = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get(
        `/posts?q=${searchFilter}&_limit=${limit}&_page=${page}`
      );
      return setAllPosts(result.data);
    } catch (error) {
      console.log("Error al traer los posts: " + error);
      throw error;
    }
  };

  const pageDisabled = page > 1 ? false : true;

  function generateLoading(number) {
    let LoadingCard = [];

    for (let i = 0; i < number; i++) {
      LoadingCard.push(<PostLoading />);
    }
    return LoadingCard;
  }

  return (
    <main className="w-full flex justify-center items-center flex-col px-24 mt-[15vh] ">
      <form onSubmit={handlerSearch}>
        <input
          type="text"
          name="search"
          placeholder="Busqueda..."
          className="outline-none border border-black rounded-3xl pl-4"
          onChange={onChangeSearchFilter}
        />
      
      </form>
      <section className="w-full h-full   grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-12 justify-center items-center">
        {allPosts.length > 0 ? (
          <>
            {allPosts.map(({ title, body, id }, key) => {
              return <Post titulo={title} body={body} id={id} key={key} />;
            })}
          </>
        ) : (
          generateLoading(9)
        )}
      </section>
      
      <article className="flex flex-col  w-full">
              <div className="flex gap-6 items-center justify-center">
                <button
                  onClick={handlerRetrocederPagina}
                  disabled={pageDisabled}
                  className={`border border-black py-2 px-6 ${
                    pageDisabled && "bg-red-600"
                  }`}
                >
                  Retroceder
                </button>
                <button onClick={handlerAvanzarPagina} className={`border border-black py-2 px-6 ${
                    allPosts.length !== limit && "bg-red-600 cursor-default" 
                  }`} >Avanzar</button>
              </div>
              <button onClick={handlerVerMas} type="button">
                Ver más posts
              </button>
            </article>
    </main>
  );
}
