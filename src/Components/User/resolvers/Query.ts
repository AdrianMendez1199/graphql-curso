import {getUserId, argsTypes, Context} from '../../../utils'


function user (parent: string, args: argsTypes, ctx: Context) {
  const {prisma, request} = ctx
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
