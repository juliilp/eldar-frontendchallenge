import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export default function usePosts() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [search, setSearch] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const handlerAvanzarPagina = () => setPage(page + 1);
  const handlerRetrocederPagina = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // const { data, isError, isLoading, isSuccess } = useQuery({
  //   queryKey: ["posts", page, search, limit],
  //   queryFn: getPosts,
  // });

  const handlerSearch = (e, input) => {
    e.preventDefault();
    console.log(input);
    setSearch(input);
  };

  const handlerVerMas = (e) => {
    e.preventDefault();
    setLimit(limit + 10);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const result = await axios.get(
          `/posts?_page=${page}&_limit=${limit}${search && `&q=${search}`}`
        );

        setAllPosts(result.data);
      } catch (error) {
        console.log("Error al traer los posts: " + error);
        throw error;
      }
    };
    getPosts();
  }, []);

  return {
    handlerAvanzarPagina,
    handlerRetrocederPagina,
    setSearch,
    handlerSearch,
    handlerVerMas,
    allPosts,
    setAllPosts,
  };
}
