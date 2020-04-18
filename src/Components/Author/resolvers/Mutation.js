import {getUserId} from '../../../utils/'

const createAuthor = async (parent, {data}, {prisma, pubsub, request}, info) => {
    // Middleware validate auth
    getUserId(request)

    const {register_by, ...rest} = data
  
    const newAuthor = await prisma.authors.create({
       data:{
         ...rest,
         users:{
            connect: {
               id: Number(register_by)
            }
         }
       }
    })
  
    pubsub.publish('author', {
      author: {
        mutation: 'CREATED',
        data: newAuthor
      }
    })
  
    return newAuthor
  }
  
  
  
  const deleteAuthor = async (parent, {id, data}, {prisma, request}, info) => {
     // Middleware validate auth
    getUserId(request)

    const deleteAuthor = await prisma.authors.delete({
      where: {
        id: Number(id)
      }
    })
  
     return deleteAuthor
  }
  
  
  const updateAuthor = async (parent, {id, data}, {prisma, request}, info) => {

    // Middleware validate auth
    getUserId(request)

    const {register_by, ...rest} = data

    if (register_by)
         data.users = {
            connect:{
                id: Number(register_by)
             }
        }

    const updatedAuthor = await prisma.authors.update({
      where:{
        id: Number(id)
      },
      data: {
          ...rest
      }
    })
  
    return updatedAuthor;
  }
  

export default {
     Mutation: {createAuthor, updateAuthor, deleteAuthor},
 }