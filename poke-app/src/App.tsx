import React from "react";
import "./App.css";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
  useQuery,
} from "@apollo/client";

const GET_POKEMON = gql`
  query getPoke($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
    }
  }
`;

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

interface getPokesInterface {
  id: number;
  number: string;
  name: string;
  maxHP: number;
  types: [string];
  image: string;
}

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
      <img src={poke.image} alt="" />
    </div>
  ));
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://graphql-pokemon.now.sh/",
  }),
});

function App() {
  const pokename = "Pikachu";
  const firstNum = 9;

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <p>GetPokemon</p>
        <GetPokemon name={pokename} />
        <p>GetPokes</p>
        <GetPokes first={firstNum} />
      </div>
    </ApolloProvider>
  );
}

export default App;
