import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/api-client";

const useAddSeller = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newSeller) =>
      apiClient.post("/users", newSeller).then((res) => res.data),

    onMutate: (newSeller) => {
      const previousSellers = queryClient.getQueryData(["sellers"]);
      queryClient.setQueryData(["sellers"], (old) => [newSeller, ...old]);
      return { previousSellers };
    },

    onSuccess: (savedSeller, newSeller) => {
      queryClient.setQueryData(["sellers"], (sellers) =>
        sellers.map((seller) => (seller === newSeller ? savedSeller : seller))
      );
    },

    onError: (error, newSeller, context) => {
      if (context?.previousSellers) {
        queryClient.setQueryData(["sellers"], context.previousSellers);
      }
    },
  });
};

export default useAddSeller;
