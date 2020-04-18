import 'babel-polyfill'
import {getUserId} from '../../../utils/'


const author = (parent, {id, first, skip}, {prisma, request}, info) => {
     // Middleware validate auth
     getUserId(request)

    if(!id)
      return prisma.authors.findMany({
        first, 
        skip
      })

      return prisma.authors.findOne({
        where:{
          id: Number(id),
        }
      });
 }

 const register_by = (parent, {id}, {prisma, request}, info) => {
    // Middleware validate auth
    getUserId(request)

  return prisma.authors.findOne({
      where:{
          id: Number(parent.id)
      }
  }).users()
}

const books = (parent, {id}, {prisma}, info) => {
    // Middleware validate auth
    getUserId(request)

  return prisma.books.findOne({
      where:{
          id: Number(parent.id)
      }
  }).authors()
}

 export default {
  Query: {author},
  Author: {register_by, books}
 }


