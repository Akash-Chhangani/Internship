import React, { useState } from "react";
import useTodos from "../../hooks/useTodos";
import Loader from "../Common/Loader";

const Sales = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data: todos, error, isLoading } = useTodos({ page, pageSize });
  return (
    <>
      <h3>Todos Page</h3>

      {isLoading && <Loader />}
      {error && <em>{error.message}</em>}
      {todos?.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}

      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <button
        disabled={page * pageSize > 200}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </>
  );
};

export default Sales;
