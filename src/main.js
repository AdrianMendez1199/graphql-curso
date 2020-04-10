import {GraphQLServer} from 'graphql-yoga'
import {types as typeDefs, resolvers} from './Components/'

import db from './db'

 const server = new GraphQLServer({
     typeDefs,
     resolvers,
     context: {db}
 })

server.start(() => {
    console.log('Server run http://localhost:4000')
})