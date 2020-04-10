import {v4 as uuidv4} from 'uuid'


const createUser = (parent, args, {db}, info) => {
    const emailIsTaken = db.users.some(user => user.email === args.email)

    if(emailIsTaken)
        throw new Error(`Email ${args.email} is taken`)
    
    const user = {
        id: uuidv4(),
        ...args
    }

    db.users.push(user)

    return user

  }

  const updateUser = (parent, args, {db}, info) => {
      const {id, ...data} = args

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

// AUTHORS
 const createAuthor = (parent, args, {db}, info) => {
    const author = {
        id: uuidv4(),
        ...args
    }

    db.authors.push(author)

    return author
 }


 const updateAuthor = (parent, args, {db}, info) => {
    const {id, ...data} = args 

     const authorExist = db.authors.find(author => author.id === id)

     if(!authorExist) throw new Error('author not found')

     db.authors =  db.authors.map(author => {
         if(author.id === id) {
            author = {...author, ...data}
            return author
         }

         return author
     })

     return {
         ...authorExist, ...data
     }
 }

const Mutation = {
    updateUser, createUser, createAuthor, updateAuthor
}


export default Mutation