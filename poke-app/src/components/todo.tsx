import React, { useState, ChangeEvent } from "react";
import {
  List,
  Checkbox,
  ListItem,
  ListItemText,
  Input,
} from "@material-ui/core";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_TODOS = gql`
  query GetTodos {
    todos {
      title
      doing
    }
  }
`;
const UPDATE_TODO = gql`
  mutation UpdateTodo($title: String!, $doing: String!) {
    updateTodo(title: $title, doing: $doing) {
      title
      doing
    }
  }
`;
const INITIAL_TODO = {
  title: "Sample Todo",
  doing: false,
};

interface todoStruct {
  title: string;
  doing: string;
}
/* frontend todo

export default function Todo() {
  const [todos, setTodos] = useState([INITIAL_TODO]);
  const [todoTitle, setTodoTitle] = useState("");

  const { loading, error, data } = useQuery(GET_TODOS);
  const [updateTodo] = useMutation(UPDATE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
  // TODO: Start todo apollo-client and apollo-server.
  // TODO: Start apollo-server wrapping pokeAPI and todoAPI.
  // todoAPI made by golang and grpc

  return (
    <div>
      <input type="text" value={todoTitle} onChange={handleTitleChanges} />
      <button type="submit" onClick={addTodos}>
        Add Todo
      </button>
      <List component="ul">
        {data.todos.map((apollotodo: any) => (
          <ListItem key={apollotodo.title} component="li">
            <Checkbox
              checked={apollotodo.doing}
              onChange={() => handleCheckboxChanges(apollotodo)}
            />
            <ListItemText>{apollotodo.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
*/

export default function Todo() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [
    updateTodo,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.todos.map(({ title, doing }: any) => {
    let input: any;
    return (
      <div key={title}>
        <p>
          {title}: {doing}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateTodo({
              variables: { title, doing: input.value },
            });
            input.value = "";
          }}
        >
          <input
            ref={(node) => {
              input = node;
            }}
          />
          <button type="submit">Update Todo</button>
        </form>
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error :(</p>}
      </div>
    );
  });
}
