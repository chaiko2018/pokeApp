import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Pokemon {
    id: ID
    number: String
    name: String
    maxHP: String
    types: [String]
    image: String
  }

  type Query {
    books: [Book]
    getPoke(name: String): Pokemon
    getPokes: [Pokemon]
  }
`;

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

const resolvers = {
  Query: {
    books: () => books,
    // TODO: Use 'Apollo Federation' or 'Schema Stitching'
    getPoke: (_parent, args) => {},
    getPokes: () => {},
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
