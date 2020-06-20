import React from "react";
import { useMutation, gql, useQuery } from "@apollo/client";

const FILE_UPLOAD = gql`
  mutation fileUpload($file: Upload) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      url
    }
  }
`;
/*
// prac mutation
const ADD_TODO = gql`
  mutation AddTodo($type: String) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;
function AddTodo() {
  let input: any;
  const [addTodo, { data }] = useMutation(ADD_TODO);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $type: String!) {
    updateTodo(id: $id, type: $type) {
      id
      type
    }
  }
`;
function Todos() {
  const { loading, error, data } = useQuery(UPDATE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);

  if (loading) return <p>now loading...</p>;
  if (error) return <p>Error...? :(</p>;

  return data.todos.map(({ id, type }) => {
    let input;

    return (
      <div key={id}>
        <p>{type}</p>
        <form onSubmit={e => {
          e.preventDefault();
          updateTodo({ variables: { id, type: input.value } });

        }}
      </div>
    );
  });
}*/

const FileUpload = ({ myfile }: any) => {
  const [fileup, { data }] = useMutation(FILE_UPLOAD);
};

export default function UpdateFile() {
  return (
    <div>
      <input type="file" />
      <button type="submit">BUTTON</button>
    </div>
  );
}
