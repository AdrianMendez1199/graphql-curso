import {GraphQLServer} from 'graphql-yoga';


const typeDefs = `
 type Query {
     hello: String!
 }`;

 const resolvers = {
     Query: {
         hello: () => `Hello Word`
     }
 }

 const server = new GraphQLServer({
     typeDefs,
     resolvers
 })

server.start(() => {
    console.log('Server run localhost:4000')
})