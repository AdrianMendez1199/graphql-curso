import {getUserId} from '../../../utils'


function user (parent: string, args: Object, {prisma, request}: any, info: string) {
  
  // auth middleware
  getUserId(request)

  const {id} : any = args

  if(!id)
     return prisma.users.findMany()

     return prisma.users.findOne({
       where:{
          id: Number(id),
       }
     })
}

export default { Query: {user} }
