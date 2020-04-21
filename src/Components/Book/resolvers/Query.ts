import {getUserId, Context, argsTypes} from '../../../utils'

function book (parent: any, args: argsTypes, ctx: Context): Object {

    const {id,  first, skip, orderBy} = args;
    const {prisma, request} = ctx

    // auth middleware 
   getUserId(request)

   if(!id)
      return prisma.books.findMany({
         first, 
         skip, 
         orderBy
      });
      
     return prisma.books.findOne({
       where: {
          id,
       }
    })
}



function writted_by (parent: any, args: argsTypes, ctx: Context) : Object {
    const {prisma, request} = ctx;
   // auth middleware 
   getUserId(request)

   return prisma.books.findOne({
       where:{
           id: Number(parent.id),
       }
   }).authors()
}

function register_by  (parent: any, args: argsTypes, ctx: Context ) : Object {
    const {prisma, request} = ctx;
    // auth middleware 
    getUserId(request)

   return prisma.books.findOne({
       where:{
           id: Number(parent.id),
       }
   }).users()
}


export default {
  Query: {book},
  Book: {writted_by, register_by}
}