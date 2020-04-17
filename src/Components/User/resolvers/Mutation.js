import {hashPassword, generateToken} from '../../../utils/'

const signup =  async (parent, {data}, {prisma}, info) => {

    const password = await hashPassword(data.password)

    const user = await prisma.users.create({
        data: {
            ...data,
            password
        }
    })    

    const token = generateToken(user.id)

    return  {
        user,
        token
    }
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


  export default {Mutation: { signup, updateUser}}