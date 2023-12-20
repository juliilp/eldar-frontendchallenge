import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function usePosts() {
  const [page, setPage] = useState(1);

  const handlerAvanzarPagina = () => setPage(page + 1);
  const handlerRetrocederPagina = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const getPosts = async () => {
    try {
      const result = await axios.get(`/posts?_page=${page}&_limit=10`);
      return result.data;
    } catch (error) {
      console.log("Error al traer los posts : " + error);
    }
  };

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["posts", page],
    queryFn: getPosts,
  });

  return {
    data,
    isError,
    isLoading,
    isSuccess,
    handlerAvanzarPagina,
    handlerRetrocederPagina,
    page,
  };
}
