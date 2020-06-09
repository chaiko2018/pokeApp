import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_POKEMON = gql`
  query getPoke($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
      image
    }
  }
`;

const GetPokemon = (name: any) => {
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: name,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data.pokemon.id === null) return <p>worry pokename</p>;

  return (
    <div key={data.pokemon.id}>
      <p>ID: {data.pokemon.id}</p>
      <p>NUMBER: {data.pokemon.number}</p>
      <p>NAME: {data.pokemon.name}</p>
      <img src={data.pokemon.image} alt="pokeimage" />
    </div>
  );
};

export default function GetPoke() {
  const [pokename, setPokename] = useState("Bulbasaur");
  const [tmpPoke, setTmpPoke] = useState("");

  const handlePokenameChanges = (e: any) => {
    setTmpPoke(e.target.value);
  };

  const handleSearchPoke = (e: any) => {
    setPokename(tmpPoke);
  };

  return (
    <div>
      <input
        type="text"
        value={tmpPoke}
        onChange={handlePokenameChanges}
        placeholder="Bulbasaur"
      />
      <button type="submit" onClick={handleSearchPoke}>
        Search
      </button>
      <GetPokemon name={pokename} />
    </div>
  );
}
