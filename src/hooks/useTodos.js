import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/api-client";

const useTodos = (userId) => {
  const fetchTodos = () =>
    apiClient
      .get(`/todos`, {
        params: {
          userId,
        },
      })
      .then((res) => res.data);
  return useQuery({
    queryKey: userId ? ["users", userId, "todos"] : ["todos"],
    queryFn: fetchTodos,
  });
};

export default useTodos;
