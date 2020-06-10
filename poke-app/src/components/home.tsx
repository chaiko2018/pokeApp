import React from "react";
import { useQuery, gql } from "@apollo/client";

interface getPokesInterface {
  id: number;
  number: string;
  name: string;
  maxHP: number;
  types: [string];
  image: string;
}

const GET_POKEMONS = gql`
  query getPokes($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      maxHP
      types
      image
    }
  }
`;

const GetPokes = (first: any) => {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: first,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.pokemons.map((poke: getPokesInterface) => (
    <div key={poke.id}>
      <p>NUMBER: {poke.number}</p>
      <p>NAME: {poke.name}</p>
      <p>MAXHP: {poke.maxHP}</p>
      <ul>
        {poke.types.map((type: any) => (
          <li key={type}>{type}</li>
        ))}
      </ul>
      <img src={poke.image} alt="poke image" />
    </div>
  ));
};

export default function Home() {
  const firstNum = 151;
  return (
    <div>
      <GetPokes first={firstNum} />
    </div>
  );
}
