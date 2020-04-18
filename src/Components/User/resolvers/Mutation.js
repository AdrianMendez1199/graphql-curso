import {hashPassword, generateToken, validatePassword, getUserId} from '../../../utils/'

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

  const updateUser = async (parent, {id, data}, {prisma, request}, info) => {
    // auth middleware
    const userId = getUserId(request)

    if(userId !== id)
        throw new Error(`Unauthorize`)

    if(data.password)
         data.password = await hashPassword(data.password)

    return prisma.users.update({
      where:{
        id: Number(id)
      },
      data
    })
  }



  const login = async (parent, {data}, {prisma}, info) => {

        const user = await prisma.users.findOne({
            where:{
                email: data.email
            }
        })

     const isValid = await validatePassword(data.password, user.password) 

     if(!isValid)
        throw new Error(`invalid credentials`)

      return {
          user,
          token: generateToken(user.id)
      }
  }


  export default {Mutation: { signup, updateUser, login}}