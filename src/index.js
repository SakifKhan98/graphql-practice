import { GraphQLServer } from "graphql-yoga";

// Scalar types - String, Boolean, Int, Float, ID
// Non-Scalar types - Object, Array

//Demo User Data
const users = [
  {
    id: "1",
    name: "Sakif",
    email: "sakif@sakif.com",
    age: 27,
  },

  {
    id: "2",
    name: "Mike",
    email: "sakmikef@smikeakif.com",
    age: 29,
  },

  {
    id: "3",
    name: "Ross",
    email: "ross@sm.com",
    age: 23,
  },
];

const posts = [
  {
    id: "1",
    title: "GraphQL 101",
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur repellendus vel eum totam architecto, reiciendis molestias sequi! Perspiciatis fuga ipsa veniam, dolorem eveniet cum obcaecati unde, expedita fugit, possimus modi.",
    isPublished: true,
    author: "1",
  },

  {
    id: "2",
    title: "GraphQL 201",
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur repellendus vel eum totam architecto, reiciendis molestias sequi! Perspiciatis fuga ipsa veniam, dolorem eveniet cum obcaecati unde, expedita fugit, possimus modi.",
    isPublished: false,
    author: "3",
  },

  {
    id: "3",
    title: "Programming Music",
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur repellendus vel eum totam architecto, reiciendis molestias sequi! Perspiciatis fuga ipsa veniam, dolorem eveniet cum obcaecati unde, expedita fugit, possimus modi.",
    isPublished: true,
    author: "2",
  },
];

const comments = [
  {
    id: "13",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur repellendus vel eum totam architecto, reiciendis molestias sequi! Perspiciatis fuga ipsa veniam, dolorem eveniet cum obcaecati unde, expedita fugit, possimus modi.",
    author: "1",
    post: "2",
  },
  {
    id: "14",
    text:
      " Tenetur repellendus vel eum totam architecto, reiciendis molestias sequi! Perspiciatis fuga ipsa veniam, dolorem eveniet cum obcaecati unde, expedita fugit, possimus modi.",
    author: "3",
    post: "1",
  },
  {
    id: "15",
    text:
      "Perspiciatis fuga ipsa veniam, dolorem eveniet cum obcaecati unde, expedita fugit, possimus modi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur repellendus vel eum totam architecto, reiciendis molestias sequi!",
    author: "2",
    post: "3",
  },
  {
    id: "16",
    text:
      "Dolor sit amet consectetur adipisicing elit. Tenetur repellendus vel eum totam architecto, reiciendis molestias sequi! Perspiciatis fuga ipsa veniam, dolorem eveniet cum obcaecati unde, expedita fugit, possimus modi.",
    author: "1",
    post: "2",
  },
];

// Type definitions (Application Schema)
const typeDefs = `
    type Query {
      users(query: String): [User!]!
      posts(query: String): [Post!]!
      me: User!
      post: Post!
      comments: [Comment!]!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]!
      comments: [Comment!]!
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      isPublished: Boolean!
      author: User!
      comments: [Comment!]!
    }

    type Comment {
      id: ID!
      text: String!
      author: User!
      post: Post!
    }
`;
// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter((post) => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },

    comments(parent, args, ctx, info) {
      return comments;
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
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
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
