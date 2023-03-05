const { ApolloServer, gql } = require("apollo-server");

//HackerNews1つ1つの投稿
let links = [
    {
        id: "link-0",
        description: "GraphQL",
        url: "www.graphQL.com",
    }
]

// GraphQLスキーマの定義
const typeDefs = gql`
    type  Query { 
        info: String! #not nullable
        feed: [Link]!
    }

    type Mutation {
        post(url: String!, description: String!): Link!
    }

    type Link {
        id: ID!
        description: String!
        url: String!
    }
`;

// リゾルバ関数
const resolvers = {
    Query: {
        info: () => "HackerNewsクローン",
        feed: () => links,
    },

    Mutation: {
        post: (parent, args) => {
            let idCount = links.length;

            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }

            links.push(link);
            return link;
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`${url}でサーバーを起動中・・・`));
