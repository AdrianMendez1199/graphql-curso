import {getUserId, Context, argsTypes} from '../../../utils'

async function createBook  (parent: any, args: argsTypes, cxt: Context) : Promise<Object> {
   const {prisma, pubsub, request} = cxt;
    // auth middleware
    getUserId(request)
  
    const {writted_by, register_by, ...rest} = args.data

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



 async function updateBook (parent: Object, args: argsTypes, ctx: Context): Promise<Object> {

      const {id, data} = args;
      const {prisma, pubsub, request}  = ctx;
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


async function deleteBook(parent: any, args: argsTypes, ctx: Context): Promise<Object> {
    const {id} = args;

    const {prisma, pubsub, request}: Context = ctx;
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