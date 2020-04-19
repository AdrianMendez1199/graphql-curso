import {getUserId} from '../../../utils'

function book (parent: Object, {id,  first, skip, orderBy}: any, {prisma, request}: any, info: Object ): Object {
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



const writted_by = (parent: any, {id}: any, {prisma, request}: any, info: Object) => {
   // auth middleware 
   getUserId(request)

   return prisma.books.findOne({
       where:{
           id: Number(parent.id),
       }
   }).authors()
}

function register_by  (parent: any, { id }: any, { prisma, request}:any, info: any) : Array<Object> {
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