import { GraphQLServer } from "graphql-yoga";

// Scalar types - String, Boolean, Int, Float, ID
// Non-Scalar types - Object, Array

// Type definitions (Application Schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
        title: String!
        price: Int!
        releaseYear: Int!
        rating: Float!
        inStock: Boolean!
    }
`;
// Resolvers
const resolvers = {
  Query: {
    id() {
      return "abc123";
    },
    name() {
      return "Sakif";
    },
    age() {
      return 23;
    },
    employed() {
      return true;
    },
    gpa() {
      return null;
    },
    title() {
      return "Hero Hunk 2021";
    },
    price() {
      return 81000;
    },
    releaseYear() {
      return 2021;
    },
    rating() {
      return 4.6;
    },
    inStock() {
      return false;
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
