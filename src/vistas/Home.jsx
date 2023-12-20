import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import PostLoading from "../components/PostLoading";
import usePosts from "../hooks/usePosts";
export default function Home() {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    handlerVerMas,
    handlerAvanzarPagina,
    handlerRetrocederPagina,
    page,
    allPosts,
  } = usePosts();
  if (isError) return <span>Error.. algo anda mal</span>;

  function generateComponentLoading(number) {
    const loadingCards = [];
    for (let i = 0; i < number; i++) {
      loadingCards.push(<PostLoading key={i} />);
    }
    return loadingCards;
  }

  const pageDisabled = page > 1 ? false : true;
  return (
    <main className="w-full flex justify-center items-center flex-col px-24 mt-[15vh] ">
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
