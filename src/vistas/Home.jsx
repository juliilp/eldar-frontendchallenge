import Navbar from "../components/Navbar";
import Post from "../components/Post";
import usePosts from "../hooks/usePosts";
export default function Home() {
  const { data, isLoading, handlerSearch, handlerVerMas, isSuccess, isError } =
    usePosts();
  console.log(data);
  if (isLoading) return <span>Loading..</span>;
  if (isError) return <span>Error.. algo anda mal</span>;
  return (
    <div>
      <Navbar />
      <section>
        {isSuccess &&
          data.map(({ title, body }, key) => {
            return <Post titulo={title} body={body} key={key} />;
          })}
      </section>
    </div>
  );
}
