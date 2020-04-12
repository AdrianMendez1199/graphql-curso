import {v4 as uuidv4} from 'uuid'


const user = (parent, args, {primas}, info) => {
  const {id} = args

  if(!id)
     return primas.users.findMany()

     return primas.users.findOne({
       where:{
          id,
       }
     })
}



const createUser = (parent, {data}, {db}, info) => {
    const emailIsTaken = db.users.some(user => user.email === data.email)

    if(emailIsTaken)
        throw new Error(`Email ${data.email} is taken`)
    
    const user = {
        id: uuidv4(),
        ...data
    }

    db.users.push(user)

    return user

  }

  const updateUser = (parent, {id, data}, {db}, info) => {

      const userExist = db.users.find(user => user.id === id)

      if(!userExist) throw new Error('user not found')
      
     const emailIsTaken = db.users.some(user => user.email === data.email)

     if(emailIsTaken) throw new Error('email not found')

      db.users = db.users.map(user => {
          if(user.id === id) {
              user = {...user, ...data}
             return user
          }

          return user
      })
 
      return {...userExist, ...data}
  }


export default {
  Query: {user},
  Mutation: { createUser, updateUser}
}
