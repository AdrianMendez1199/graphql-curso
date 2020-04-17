import {hashPassword} from '../../../utils/'

const createUser =  async (parent, {data}, {prisma}, info) => {
    const {password, ...rest} = data

    const passwordHashed = await hashPassword(password)

    return prisma.users.create({
      data: {
          ...rest,
          password: passwordHashed,
      },
    })    
}

  const updateUser = async (parent, {id, data}, {prisma}, info) => {

    if(data.password)
         data.password = await hashPassword(data.password)

    return prisma.users.update({
      where:{
        id: Number(id)
      },
      data
    })
  }


  export default {Mutation: { createUser, updateUser}}