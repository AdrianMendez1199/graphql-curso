import {GraphQLServer, PubSub} from 'graphql-yoga'
import {types as typeDefs, resolvers} from './Components/'
import {PrismaClient} from '@prisma/client'

const pubsub = new PubSub();
const prisma = new PrismaClient();

const context = {
    pubsub,
    prisma
}

 const server = new GraphQLServer({
     typeDefs,
     resolvers,
     context: request => {
         return {
             ...request,
             ...context
         }
     }
 })

server.start(() => {
    console.log('Server run http://localhost:4000')
})