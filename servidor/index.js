import express from 'express';

// GraphQL
import { ApolloServer } from 'apollo-server-express';

//Schema 
import { typeDefs } from './database/schema';
import { resolvers } from './database/resolvers';

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });


app.listen({port: 8000}, () => console.log(`El servidor esta funcionando http://localhost:8000/${server.graphqlPath}`));