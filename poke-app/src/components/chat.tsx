import React, { useState, ChangeEvent } from "react";

const INITIAL_TODO = {
  title: "Sample Todo",
  doing: false,
};

export default function Chat() {
  const [todos, setTodos] = useState([INITIAL_TODO]);
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };
  const addTodos = (e: any) => {
    setTodos([
      ...todos,
      {
        title: todoTitle,
        doing: false,
      },
    ]);
    setTodoTitle("");
  };

  return (
    <div>
      <input type="text" value={todoTitle} onChange={handleTitleChanges} />
      <button type="submit" onClick={addTodos}>
        Add Todo
      </button>
      {todos.map((todo: any) => (
        <div key={todo.title}>{todo.title}</div>
      ))}
    </div>
  );
}
