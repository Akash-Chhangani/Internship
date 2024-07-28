import { useMutation } from "@tanstack/react-query";
import apiClient from "../../utils/api-client";
const useDeleteSeller = () => {
  return useMutation({
    mutationFn: (id) =>
      apiClient.delete(`/users/${id}`).then((res) => res.data),
  });
};

export default useDeleteSeller;
