import {GraphQLServer} from 'graphql-yoga'
import Query from './resolvers/Query'
import db from './db'
import Author from './resolvers/Author'
import Book from './resolvers/Book'
import Mutation from './resolvers/Mutation'


 const server = new GraphQLServer({
     typeDefs: './src/schema.graphql',
     resolvers: {Query, Author, Book, Mutation},
     context: {db}
 })

server.start(() => {
    console.log('Server run localhost:4000')
})