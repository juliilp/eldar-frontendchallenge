import React, { useState } from "react";
import Post from "../components/Post";
import PostLoading from "../components/PostLoading";
import usePosts from "../hooks/usePosts";
import axios from "axios";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
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
    <main className="w-full flex justify-center items-center flex-col px-24 mt-[15vh] relative" id="menu" >
      <form onSubmit={handlerSearch}>
        <input
          type="text"
          name="search"
          placeholder="Busqueda..."
          className="outline-none border border-black rounded-3xl pl-4 mb-8"
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
              pageDisabled && "bg-red-600 cursor-not-allowed"
            }`}
          >
            Retroceder
          </button>
          <button
            onClick={handlerAvanzarPagina}
            className={`border border-black py-2 px-6 ${
              allPosts.length !== limit && "bg-red-600 cursor-not-allowed"
            }`}
          >
            Avanzar
          </button>
        </div>

        <div className="flex gap-3 items-center justify-center my-4" >
          <button onClick={handlerVerMas} type="button">
            Ver más posts
          </button>
          <FaArrowDown />
        </div>
      </article>
            
            {
              allPosts.length > 17 &&  <a href="#menu" className="fixed right-10 bottom-10 rounded-full bg-red-600 p-4 " ><FaArrowUp size={25} /></a>
            }
     
    </main>
  );
}