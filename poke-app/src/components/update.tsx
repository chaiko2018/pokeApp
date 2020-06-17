import React from "react";
import { useMutation, gql } from "@apollo/client";

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

const FileUpload = ({ myfile }: any) => {
  const { loading, error, data } = useMutation(FILE_UPLOAD, {
    variables: myfile,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR :(</p>;

  return (
    {data.map((uploadFile: any) => (

    ))}
  )
};

export default function UpdateFile() {
  return (
    <div>
      <input type="file" />
      <button type="submit">BUTTON</button>
    </div>
  );
}
