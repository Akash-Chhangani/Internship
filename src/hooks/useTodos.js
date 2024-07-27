import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../utils/api-client";

const useTodos = (query) => {
  const fetchTodos = () =>
    apiClient
      .get(`/todos`, {
        params: {
          _limit: query.pageSize,
          _start: (query.page - 1) * query.pageSize,
        },
      })
      .then((res) => res.data);
  return useQuery({
    queryKey: ["todos", query],
    queryFn: fetchTodos,
    placeholderData: keepPreviousData,
  });
};

export default useTodos;
