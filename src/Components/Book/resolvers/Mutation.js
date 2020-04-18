import {getUserId} from '../../../utils/'

const createBook = async (parent, {data}, {prisma, pubsub, request}, info) => {
    // auth middleware
    getUserId(request)
  
    const {writted_by, register_by, ...rest} = data

    const newBook = await prisma.books.create({
       data:{
          ...rest,
          users:{
             connect:{
               id: Number(register_by)
             }
          },
          authors: {
             connect:{
                id: Number(writted_by)
             }
          }
       }
    })

    pubsub.publish(`book - ${writted_by}`, 
    {
      book: {
         mutation: 'CREATED',
         data: newBook
      } 
    })

     return newBook
}



const updateBook = async (parent, {id, data}, {prisma, pubsub, request}, info) => {
     // auth middleware
     getUserId(request)
  
    const {register_by, writted_by, ...rest} = data
  
   if(register_by)
      rest.users = {
         connect: {id: Number(register_by) }
      }

  if(writted_by)
        rest.authors = {
            connect: {id: Number(writted_by)}
        }

   const bookUpdated = await prisma.books.update({
       where: {
          id: Number(id)
       },
      data: { 
          ...rest, 
      }
   })

   pubsub.publish(`book - ${bookUpdated.writted_by}`, {
      book: {
         mutation: 'UPDATED',
         data: bookUpdated
      }
   })
  
   return bookUpdated
}


const deleteBook = async(parent, {id}, {prisma, pubsub, request}, info) => {
    // auth middleware
    getUserId(request)
  
  const deletedBook = await  prisma.books.delete({
     where:{
        id: Number(id)
     }
  })
   
   pubsub.publish(`book - ${deletedBook.writted_by}`, {
      book:{
         mutation: 'DELETED',
         data: deletedBook
      }
   })

   return deletedBook
}


export default {
    Mutation: {createBook, updateBook, deleteBook}
}