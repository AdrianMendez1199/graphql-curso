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
  

  export default {Mutation: { createUser, updateUser}}