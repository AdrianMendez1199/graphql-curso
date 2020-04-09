import {GraphQLServer} from 'graphql-yoga';
import Query from './resolvers/Query';
import db from './db';

 const resolvers = {
   Query
 }

 const server = new GraphQLServer({
     typeDefs: './src/schema.graphql',
     resolvers,
     context: {db}
 })

server.start(() => {
    console.log('Server run localhost:4000')
})