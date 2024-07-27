import React, { useState } from "react";
import apiClient from "../../utils/api-client";
import Loader from "../Common/Loader";
import useSellers from "../../hooks/useSellers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Sellers = () => {
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

  const [name, setName] = useState("");

  const addSeller = () => {
    const newSeller = {
      name,
      id: sellers.length + 1,
    };

    addSellersMutation.mutate(newSeller);
  };

  const deleteSeller = (id) => {
    setSellers(sellers.filter((s) => s.id !== id));
    apiClient.delete(`/users/${id}`).catch((err) => {
      setErrors(err.message);
      setSellers(sellers);
    });
  };

  const updateSeller = (seller) => {
    const updatedSeller = {
      ...seller,
      name: seller.name + " Updated",
    };
    setSellers(sellers.map((s) => (s.id === seller.id ? updatedSeller : s)));

    apiClient.patch(`/users/${seller.id}`, updatedSeller).catch((err) => {
      setErrors(err.message);
      setSellers(sellers);
    });
  };

  return (
    <>
      <h3>Admin Sellers Page</h3>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <button onClick={addSeller}>Add Seller</button>
      {isLoading && <Loader />}
      {error && <em>{error.message}</em>}

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
