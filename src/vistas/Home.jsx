import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import PostLoading from "../components/PostLoading";
import usePosts from "../hooks/usePosts";
import axios from "axios";
import { FaArrowDown, FaArrowUp, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function Home() {
  const [searchFilter, setSearchFilter] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
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
      if (result.data.length === 0)
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡No se encontro ningun post!",
        });
      setAllPosts(result.data);
      // Resetea la visibilidad del botón al hacer una nueva búsqueda
      setShowScrollButton(false);
    } catch (error) {
      console.log("Error al traer los posts: " + error);
      throw error;
    }
  };

  const generateLoading = (number) => {
    let LoadingCard = [];
    for (let i = 0; i < number; i++) {
      LoadingCard.push(<PostLoading key={i} />);
    }
    return LoadingCard;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollButton(scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pageDisabled = page > 1 ? false : true;
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
          className="outline-2 py-2 pl-4 mb-8 relative w-[300px] "
          onChange={onChangeSearchFilter}
        />
        <FaSearch
          className="absolute top-[10px] right-2 font-bold cursor-pointer"
          onClick={handlerSearch}
          size={15}
        />
      </form>

      <section className="w-full h-full grid md:grid-cols-2 xl:grid-cols-3 gap-10 mb-12 justify-center items-center">
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

      <article className="flex flex-col w-full items-center justify-center">
        <div className="flex gap-2 items-center justify-center px-6 md:px-0 md:gap-6">
          <button
            onClick={handlerRetrocederPagina}
            disabled={pageDisabled}
            className={`rounded-lg py-2 px-6 md:px-10 font-bold bg-[#4A8ECC] text-white ${
              pageDisabled && "cursor-not-allowed bg-red-600"
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

        <div className="flex gap-3 items-center justify-center my-4 w-max ">
          <button
            type="button"
            className="text-xl md:text-2xl my-8"
            onClick={handlerVerMas}
          >
            Ver más posts
          </button>
          <FaArrowDown
            size={25}
            className="animate-bounce cursor-pointer"
            onClick={handlerVerMas}
          />
        </div>
      </article>

      {showScrollButton && (
        <a
          href="#menu"
          className="fixed right-10 bottom-10 rounded-full bg-red-600 p-4 "
        >
          <FaArrowUp size={25} color="white" className="animate-pulse" />
        </a>
      )}
    </motion.main>
  );
}
