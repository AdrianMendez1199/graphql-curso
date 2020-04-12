import {v4 as uuidv4} from 'uuid'

const author = (parent, {id}, {db}, info) => {
    if(!id)
      return db.authors

      return db.authors.filter(author => author.id === id);
 }


 const createAuthor = (parent, {data}, {db, pubsub}, info) => {
  const author = {
      id: uuidv4(),
      ...data
  }

  db.authors.push(author)
  pubsub.publish('author', {
    author: {
      mutation: 'CREATED',
      data: author
    }
  })
  return author
}


const updateAuthor = (parent, {id, data}, {db}, info) => {
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


 export default {
  Query: {author},
  Mutation: {createAuthor, updateAuthor},
  // Subscription
 }