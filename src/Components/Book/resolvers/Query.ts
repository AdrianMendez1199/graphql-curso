import {getUserId} from '../../../utils'

function book (parent: any, params: string[], ctx: any): Object {

    const {id,  first, skip, orderBy}: any = params;
    const {prisma, request}: any = ctx

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



function writted_by (parent: any, params: any, ctx: any) {
    const {prisma, request}: any = ctx;
   // auth middleware 
   getUserId(request)

   return prisma.books.findOne({
       where:{
           id: Number(parent.id),
       }
   }).authors()
}

function register_by  (parent: any, params: any,  ctx:any, info: any) : Object {
    const {prisma, request}: any = ctx;
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