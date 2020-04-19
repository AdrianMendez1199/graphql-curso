import {hashPassword, generateToken, validatePassword, getUserId} from '../../../utils'

async function signup  (parent: any, {data} : any, {prisma} : any, info: any) : Promise<Object> {
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

 async function  updateUser (parent: string, {id, data}:number|any, {prisma, request}: any, info: string): Promise<any> {
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
 


 async function login (parent: string, {data}: any, {prisma}: any, info: string): Promise<Object> {

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