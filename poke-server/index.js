const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

/*
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
    doing: String
  }

  type UploadedFileResponse {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  type Query {
    books: [Book]
    getPoke(name: String): Pokemon
    getPokes: [Pokemon]
    todos: [Todo]
  }

  type Mutation {
    singleUpLoad(file: Upload): UploadedFileResponse!
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
/*
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
    books: () => books,
    // TODO: Use 'Apollo Federation' or 'Schema Stitching'
    getPoke: (_parent, args) => {},
    getPokes: () => {},
    todos: () => todos, // TODO: to link databases system
  },
  Mutation: {
    singleUpLoad: async (parent, { file }) => {
      const { stream, filename, mimetype, encoding } = await file;
      // Do Work
      return { filename, mimetype, encoding, url: "" };
    },
    updateTodo: (parent, args) => {
      console.log(args);
      const update
    },
  },
};
*/

const gateway = new ApolloGateway({
  serviceList: [
    { name: "sample", url: "http://localhost:4001" },
    { name: "pokelist", url: "https://graphql-pokemon.now.sh/" },
  ],
});

const server = new ApolloServer({
  //typeDefs,
  //resolvers,
  gateway,
  subscriptions: false,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
