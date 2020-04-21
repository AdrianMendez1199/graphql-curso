import {getUserId, Context, argsTypes} from '../../../utils'


function author (parent: any, args: argsTypes, ctx: Context) : Object {
  
    const {id, first, skip, orderBy} = args;
    const {prisma, request} = ctx;

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

 function register_by  (parent: any, args: argsTypes, ctx: Context) : Object {
      const {id} = args
      const {prisma, request} = ctx;

      // Middleware validate auth
      getUserId(request)

      return prisma.authors.findOne({
          where:{
              id: Number(parent.id)
          }
      }).users()
}

function books (parent: any, args: argsTypes, ctx: Context) : Object {
   const {prisma, request} = ctx
   
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


