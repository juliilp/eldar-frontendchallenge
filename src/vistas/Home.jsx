import Navbar from "../components/Navbar";
import Post from "../components/Post";
import PostLoading from "../components/PostLoading";
import usePosts from "../hooks/usePosts";
export default function Home() {
  const { data, isLoading, handlerSearch, handlerVerMas, isSuccess, isError } =
    usePosts();
  console.log(data);
  if (isLoading) return <span>Loading..</span>;
  if (isError) return <span>Error.. algo anda mal</span>;

  function generateComponentLoading(number) {
    const loadingCards = [];
    for (let i = 0; i < number; i++) {
      loadingCards.push(<PostLoading key={i} />);
    }
    return loadingCards;
  }
  generateComponentLoading(9);
  return (
    <main className="w-full flex justify-center items-center flex-col px-24 ">
      <section className="w-full h-full  mt-[15vh] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {isLoading && generateComponentLoading(8)}
        {isSuccess &&
          data.map(({ title, body, id }, key) => {
            return <Post titulo={title} body={body} id={id} key={key} />;
          })}
      </section>
    </main>
  );
}
