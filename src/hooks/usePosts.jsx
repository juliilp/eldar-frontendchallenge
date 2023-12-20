import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";



export default function usePosts() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(7)
  const [search, setSearch] = "algo"
  const getPosts = async () => {
    try {
      const result = await axios.get("/posts?_page=2&_limit=10&q=delectus");
      return result.data;
    } catch (error) {
      console.log("Error al traer los posts : " + error);
    }
  };

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return { data, isError, isLoading, isSuccess };
}
