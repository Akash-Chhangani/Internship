import React, { useState } from "react";
import apiClient from "../../utils/api-client";
import Loader from "../Common/Loader";
import useSellers from "../../hooks/useSellers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Sellers = () => {
  const [name, setName] = useState("");
  const { data: sellers, error, isLoading } = useSellers();
  const queryClient = useQueryClient();
  const addSellersMutation = useMutation({
    mutationFn: (newSeller) =>
      apiClient.post("/users", newSeller).then((res) => res.data),
    onSuccess: (savedSeller, newSeller) => {
      queryClient.setQueryData(["sellers"], (sellers) => [
        savedSeller,
        ...sellers,
      ]);
    },
  });

  const addSeller = () => {
    const newSeller = {
      name,
      id: sellers.length + 1,
    };

    addSellersMutation.mutate(newSeller);
  };

  const deleteSellerMutation = useMutation({
    mutationFn: (id) =>
      apiClient.delete(`/users/${id}`).then((res) => res.data),
  });

  const updatedSellerMutation = useMutation({
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

  const deleteSeller = (id) => {
    deleteSellerMutation.mutate(id, {
      onSuccess: () => {
        queryClient.setQueryData(["sellers"], (sellers) =>
          sellers.filter((s) => s.id !== id)
        );
      },
    });
  };

  const updateSeller = (seller) => {
    const updatedSeller = {
      ...seller,
      name: seller.name + " Updated",
    };

    updatedSellerMutation.mutate(updatedSeller);
  };

  return (
    <>
      <h3>Admin Sellers Page</h3>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <button disabled={addSellersMutation.isPending} onClick={addSeller}>
        {addSellersMutation.isPending ? "Adding Seller" : "Add Seller"}
      </button>
      {isLoading && <Loader />}
      {error && <em>{error.message}</em>}
      {addSellersMutation.error && <em>{addSellersMutation.error.message}</em>}

      <table>
        <tbody>
          {sellers?.map((seller) => (
            <tr key={seller.id}>
              <td>{seller.name}</td>
              <td>
                <button onClick={() => updateSeller(seller)}>Update</button>
              </td>
              <td>
                <button onClick={() => deleteSeller(seller.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Sellers;
