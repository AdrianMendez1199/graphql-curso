import {
       hashPassword, 
       generateToken,
       validatePassword, 
       getUserId,
       argsTypes,
       Context
    } from '../../../utils'

    async function signup  (parent: any, args : argsTypes, ctx : Context) : Promise<Object> {
        const {data} = args
        const {prisma} = ctx;
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

 async function  updateUser (parent: string, args : argsTypes, ctx : Context): Promise<Object> {
    // auth middleware
    const {prisma, request} = ctx
    const {id, data} = args

    const userId = <number>getUserId(request)

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
 


    async function login (parent: string, args : argsTypes, ctx : Context): Promise<Object> {
        const {prisma} = ctx
        const {data} = args

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