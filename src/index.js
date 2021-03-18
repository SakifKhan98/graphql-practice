import { GraphQLServer } from "graphql-yoga";

// Scalar types - String, Boolean, Int, Float, ID
// Non-Scalar types - Object, Array

// Type definitions (Application Schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`;
// Resolvers
const resolvers = {
  Query: {
    hello() {
      return "This is my first Query";
    },
    name() {
      return "Sakif is the Name";
    },
    location() {
      return "Banasree";
    },
    bio() {
      return "MERN Stack ME";
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
