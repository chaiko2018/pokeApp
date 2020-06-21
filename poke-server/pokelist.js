const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const port = 4002;

const typeDefs = gql`
  type Pokemon @key(fields: "id") {
    id: ID
    number: String
    name: String
    maxHP: String
    types: [String]
    image: String
  }

  extend type Query {
    getPoke(name: String): Pokemon
    getPokes: [Pokemon]
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
    doing: "false",
  },
  {
    title: "todo_sample2",
    doing: "true",
  },
];

const resolvers = {
  Query: {
    getPoke: (_parent, args) => {},
    getPokes: () => {},
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port }).then(({ url }) => {
  console.log(`sample service ready at ${url}`);
});
