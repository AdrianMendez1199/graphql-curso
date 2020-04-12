import {GraphQLServer, PubSub} from 'graphql-yoga'
import {types as typeDefs, resolvers} from './Components/'

import db from './db'

const pubsub = new PubSub();

 const server = new GraphQLServer({
     typeDefs,
     resolvers,
     context: {db, pubsub}
 })

server.start(() => {
    console.log('Server run http://localhost:4000')
})