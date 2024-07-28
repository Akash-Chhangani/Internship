import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/api-client";

const useUpdateSeller = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedSeller) =>
      apiClient
        .patch(`/users/${updatedSeller.id}`, updatedSeller)
        .then((res) => res.data),
    onSuccess: (updatedSeller) => {
      queryClient.setQueryData(["sellers"], (sellers) =>
        sellers.map((s) => (s.id === updatedSeller.id ? updatedSeller : s))
      );
    },
  });
};

export default useUpdateSeller;
