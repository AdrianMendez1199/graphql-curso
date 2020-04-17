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

const createUser =  (parent, {data}, {prisma}, info) => {
    return prisma.users.create({
      data,
    })    
}

  const updateUser = (parent, {id, data}, {prisma}, info) => {

    return prisma.users.update({
      where:{
        id: Number(id)
      },
      data
    })
  }


export default {
  Query: {user},
  Mutation: { createUser, updateUser}
}
