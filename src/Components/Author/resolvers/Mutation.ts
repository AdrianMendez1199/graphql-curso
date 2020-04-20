import {getUserId, Context, argsTypes} from '../../../utils'

async function createAuthor  (parent: any, args: argsTypes, ctx: Context): Promise<any> {
    // Middleware validate auth
     const {request, prisma, pubsub} = ctx;
     
     getUserId(request)

     const {register_by, ...rest} = args.data
  
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
  
  
  
  async function deleteAuthor (parent: any, {id}: any, ctx: Context) : Promise<Object> {
    const {prisma, request} = ctx;
     // Middleware validate auth
    getUserId(request)

    const deleteAuthor = await prisma.authors.delete({
      where: {
        id: Number(id)
      }
    })
  
     return deleteAuthor
  }
  
  
  async function updateAuthor  (parent: any, {id, data}: any, ctx: Context, info: any) : Promise<any>  {
    const {prisma, request} = ctx;
    // Middleware validate auth
    getUserId(request)

    const {register_by, ...rest}: any = data

    if (register_by)
         data.users = {
            connect:{
                id: Number(register_by)
             }
        }

    const updatedAuthor: Object = await prisma.authors.update({
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