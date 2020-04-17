const user = (parent, args, {prisma}, info) => {
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
