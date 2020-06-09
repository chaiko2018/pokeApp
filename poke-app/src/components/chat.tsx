import React, { useState, ChangeEvent } from "react";
import { List, Checkbox, ListItem, ListItemText } from "@material-ui/core";

const INITIAL_TODO = {
  title: "Sample Todo",
  doing: false,
};

interface todoStruct {
  title: string;
  doing: boolean;
}

export default function Chat() {
  const [todos, setTodos] = useState([INITIAL_TODO]);
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };
  const addTodos = (e: any) => {
    if (todoTitle === "") {
      alert("Please input something text");
      return;
    }
    setTodos([
      ...todos,
      {
        title: todoTitle,
        doing: false,
      },
    ]);
    setTodoTitle("");
  };

  const handleCheckboxChanges = (todo: todoStruct) => {
    setTodos(
      todos.filter((x) => {
        if (x === todo) x.doing = !x.doing;
        return x;
      })
    );
  };

  // TODO: Set delete button
  // TODO: Start chat apollo-client and apollo-server.
  // TODO: Start apollo-server wrapping pokeAPI and chatAPI.

  return (
    <div>
      <input type="text" value={todoTitle} onChange={handleTitleChanges} />
      <button type="submit" onClick={addTodos}>
        Add Todo
      </button>
      <List component="ul">
        {todos.map((todo: any) => (
          <ListItem key={todo.title} component="li">
            <Checkbox
              checked={todo.doing}
              onChange={() => handleCheckboxChanges(todo)}
            />
            <ListItemText>{todo.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
