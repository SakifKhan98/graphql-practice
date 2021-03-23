import { GraphQLServer } from "graphql-yoga";

// Scalar types - String, Boolean, Int, Float, ID
// Non-Scalar types - Object, Array

// Type definitions (Application Schema)
const typeDefs = `
    type Query {
      greeting(name: String, position: String): String!
      add(numbers: [Float!]!): Float!
      grades: [Int!]!
      me: User!
      post: Post!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
    }
`;
// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello, ${args.name}! You are my favorite ${args.position}`;
      } else {
        return "Hekki There";
      }
    },
    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0;
      }

      // [1, 5, 10, 2]
      return args.numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    },
    grades(parent, args, ctx, info) {
      return [47, 98, 78, 93, 95];
    },
    me() {
      return {
        id: "123098",
        name: "Ross",
        email: "ross@mail.com",
        age: 29,
      };
    },
    post() {
      return {
        id: "23234",
        title: "Title of your Tape",
        body:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, obcaecati!",
        published: true,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("The Server is Up");
});
