import {getUserId} from '../../../utils'


function author  (parent: any, {id, first, skip, orderBy}: any, {prisma, request}: any, info: any) : Object {
     // Middleware validate auth
     getUserId(request)

    if(!id)
      return prisma.authors.findMany({
        first, 
        skip,
        orderBy
      })

      return prisma.authors.findOne({
        where:{
          id: Number(id),
        }
      });
 }

 function register_by  (parent: any, {id}: any, {prisma, request}: any , info: any) : Object {
    // Middleware validate auth
    getUserId(request)

  return prisma.authors.findOne({
      where:{
          id: Number(parent.id)
      }
  }).users()
}

const books = (parent: any, {id}: any, {prisma, request}: any, info: any) => {
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


