import React, { useState } from "react";
import useTodos from "../../hooks/useTodos";
import Loader from "../Common/Loader";

const Sales = () => {
  const pageSize = 10;
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTodos({ pageSize });
  return (
    <>
      <h3>Todos Page</h3>

      {isLoading && <Loader />}
      {error && <em>{error.message}</em>}
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page?.map((todo) => (
            <p key={todo.id}>{todo.title}</p>
          ))}
        </React.Fragment>
      ))}

      {hasNextPage && (
        <button disabled={isFetchingNextPage} onClick={fetchNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
};

export default Sales;
