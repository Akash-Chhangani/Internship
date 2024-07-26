import React, { useState } from "react";
import useTodos from "../../hooks/useTodos";
import Loader from "../Common/Loader";

const Sales = () => {
  const [userId, setUserId] = useState(null);
  const { data: todos, error, isLoading } = useTodos(userId);
  return (
    <>
      <h3>Todos Page</h3>
      <select
        onChange={(e) => setUserId(parseInt(e.target.value))}
        value={userId}
      >
        <option value=""> Select USer </option>
        <option value="1"> USer 1</option>
        <option value="2"> USer 2</option>
        <option value="3"> USer 3</option>
        <option value="4"> USer 4</option>
        <option value="5"> USer 5</option>
      </select>
      {isLoading && <Loader />}
      {error && <em>{error.message}</em>}
      {todos?.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </>
  );
};

export default Sales;
