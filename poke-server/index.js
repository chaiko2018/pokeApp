const { ApolloServer, gql } = require("apollo-server");

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

  type Todo {
    title: String
    doing: Boolean
  }

  type Query {
    books: [Book]
    getPoke(name: String): Pokemon
    getPokes: [Pokemon]
    todos: [Todo]
  }
`;

// temp use apollo-server and grpc
/*
const typeDefs = gql`
  type Greeting {
    id: Int!
    message: String!
  }

  type Query {
    greeting(id: Int!) Greeting
    greetings: [Greeting!]!
  }

  type Mutation {
    greeting(message: String!): Greeting!
  }
`;

const resolvers = {
  Query: {
    greeting: async (_source, { id }) => {
      const result = await GetGreeting({ id }, (err, result) => {
        return result
      })
      if (!result.hasOwnProperty("greeting")) {
        return undefined
      }
    }
    greetings:
  },
  Mutation: {
    greeting:
  }
}
*/

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

const todos = [
  {
    title: "todo_sample",
    doing: false,
  },
  {
    title: "todo_sample2",
    doing: true,
  },
];

const resolvers = {
  Query: {
    books: () => books,
    // TODO: Use 'Apollo Federation' or 'Schema Stitching'
    getPoke: (_parent, args) => {},
    getPokes: () => {},
    todos: () => todos, // TODO: to link databases system
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
