import {getUserId} from '../../../utils/'

const book = (parent, {id}, {prisma, request}, info) => {
   // auth middleware 
   getUserId(request)
   
   if(!id)
      return prisma.books.findMany();
      
     return prisma.books.findOne({
       where: {
          id,
       }
    })
}



const writted_by = (parent, {id}, {prisma, request}, info) => {
   // auth middleware 
   getUserId(request)

   return prisma.books.findOne({
       where:{
           id: Number(parent.id),
       }
   }).authors()
}

const register_by = (parent, { id }, { prisma, request}, info) => {
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