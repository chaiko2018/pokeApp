import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_POKEMON = gql`
  query getPoke($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
    }
  }
`;

const GetPokemon = (name: any) => {
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: name,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div key={data.pokemon.id}>
      <p>ID: {data.pokemon.id}</p>
      <p>NUMBER: {data.pokemon.number}</p>
      <p>NAME: {data.pokemon.name}</p>
    </div>
  );
};

export default function GetPoke() {
  const pokename = "Pikachu";
  return (
    <div>
      <GetPokemon name={pokename} />
    </div>
  );
}
