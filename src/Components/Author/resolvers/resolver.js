import 'babel-polyfill';

const author = (parent, {id}, {prisma}, info) => {
    if(!id)
      return prisma.authors.findMany()

      return prisma.authors.findOne({
        where:{
          id: Number(id),
        }
      });
 }


 const createAuthor = async (parent, {data}, {prisma, pubsub}, info) => {
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



const deleteAuthor = async (parent, {id, data}, {prisma}, info) => {

  const deleteAuthor = await prisma.authors.delete({
    where: {
      id: Number(id)
    }
  })

   return deleteAuthor
}


const updateAuthor = async (parent, {id, data}, {prisma}, info) => {

  if (data.register_by)
      data.users = {
        connect:{
           id: Number(data.register_by)
        }
      }

   if(data.writted_by)
      data.books = {
        connect: {
          id: Number(data.writted_by)
        }
      }

  const updatedAuthor = await prisma.author.update({
    where:{
      id: Number(id)
    },
    data
  })

  return updatedAuthor;
}


 export default {
  Query: {author},
  Mutation: {createAuthor, updateAuthor, deleteAuthor},
 }