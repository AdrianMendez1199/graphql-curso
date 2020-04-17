const book = (parent, {id}, {prisma}, info) => {
    if(!id)
      return prisma.books.findMany();
      
     return prisma.books.findOne({
       where: {
          id,
       }
    })
}

const createBook = async (parent, {data}, {prisma, pubsub}, info) => {
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



const updateBook = async (parent, {id, data}, {prisma, pubsub}, info) => {


   if(data.register_by)
      data.users = {
         connect: {
            id: Number(data.register_by)
         }
      }

    if(data.writted_by)
      data.books = {
         connect: {
            id: Number(data.writted_by)
         }
      }

   const bookUpdated = await prisma.books.update({
       where: {
          id: Number(id)
       },
       data
   })

   pubsub.publish(`book - ${bookUpdated.writted_by}`, {
      book: {
         mutation: 'UPDATED',
         data: bookUpdated
      }
   })
  
   return bookUpdated
}


const deleteBook = async(parent, {id}, {prisma, pubsub}, info) => {
   
  const deletedBook = await  prisma.books.delete({
     where:{
        id: Number(id)
     }
  })
   
   pubsub.publish(`book - ${bookExist.writted_by}`, {
      book:{
         mutation: 'DELETED',
         data: deletedBook
      }
   })

   return deletedBook
}


export default {
  Query: {book},
  Mutation: {createBook, updateBook, deleteBook}
}