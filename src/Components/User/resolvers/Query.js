import {getUserId} from '../../../utils'


const user = (parent, args, {prisma, request}, info) => {
  
  // auth middleware
  getUserId(request)

  const {id} = args

  if(!id)
     return prisma.users.findMany()

     return prisma.users.findOne({
       where:{
          id: Number(id),
       }
     })
}

export default { Query: {user} }
