import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function usePosts() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [search, setSearch] = useState("");
  const handlerAvanzarPagina = () => setPage(page + 1);
  const handlerRetrocederPagina = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const getPosts = async () => {
    try {
      const result = await axios.get(
        `/posts?_page=${page}&_limit=${limit}${search && `&q=${search}`}`
      );
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log("Error al traer los posts: " + error);
      throw error;
    }
  };

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["posts", page, search, limit],
    queryFn: getPosts,
  });

  const handlerSearch = (e, input) => {
    e.preventDefault();
    console.log(input);
    setSearch(input);
  };

  const handlerVerMas = () => setLimit(limit + 10);
  return {
    data,
    isError,
    isLoading,
    isSuccess,
    handlerAvanzarPagina,
    handlerRetrocederPagina,
    page,
    setSearch,
    handlerSearch,
    handlerVerMas,
  };
}
