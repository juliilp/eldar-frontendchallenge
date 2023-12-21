import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import PostLoading from "../components/PostLoading";
import usePosts from "../hooks/usePosts";
import axios from "axios";
import { FaArrowDown, FaArrowUp, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
      className="w-full flex justify-center items-center flex-col px-24 mt-[15vh] relative"
      id="menu"
    >
      <form onSubmit={handlerSearch} className="relative">
        <input
          type="text"
          name="search"
          placeholder="Busqueda..."
          className="outline-2  py-2 pl-4 mb-8 relative w-[300px] "
          onChange={onChangeSearchFilter}
        />
        <FaSearch
          className="absolute top-[10px] right-2 font-bold cursor-pointer"
          onClick={handlerSearch}
          size={15}
        />
      </form>
      <section className="w-full h-full   grid md:grid-cols-2 xl:grid-cols-3 gap-10 mb-12 justify-center items-center">
        {allPosts.length > 0 ? (
          <>
            {allPosts.map(({ title, body, id }, key) => {
              return <Post titulo={title} body={body} id={id} key={key + 1} />;
            })}
          </>
        ) : (
          generateLoading(9)
        )}
      </section>

      <article className="flex flex-col  w-full">
        <div className="flex gap-2 items-center justify-center px-6 md:px-0 md:gap-6">
          <button
            onClick={handlerRetrocederPagina}
            disabled={pageDisabled}
            className={`rounded-lg py-2 px-6 md:px-10 font-bold bg-[#4A8ECC] text-white ${
              pageDisabled && "cursor-not-allowed  bg-red-600 "
            }`}
          >
            Retroceder
          </button>
          <button
            onClick={handlerAvanzarPagina}
            className={`rounded-lg py-2 px-6 md:px-10 font-bold bg-[rgb(74,142,204)] text-white ${
              allPosts.length !== limit && "bg-red-600 cursor-not-allowed"
            }`}
          >
            Avanzar
          </button>
        </div>

        <div
          className="flex gap-3 items-center justify-center my-4 cursor-pointer "
          onClick={handlerVerMas}
        >
          <button type="button" className=" text-sm md:text-xl">
            Ver más posts
          </button>
          <FaArrowDown size={20} />
        </div>
      </article>

      {allPosts.length > 17 && (
        <a
          href="#menu"
          className="fixed right-10 bottom-10 rounded-full bg-red-600 p-4 "
        >
          <FaArrowUp
            size={25}
            color="white"
            className="animate-bounce w-6 h-6"
          />
        </a>
      )}
    </motion.main>
  );
}
