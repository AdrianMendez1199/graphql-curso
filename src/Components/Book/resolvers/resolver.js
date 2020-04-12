
import {v4 as uuidv4} from 'uuid'
const book =  (parent, {id}, {db}, info) => {
    if(!id)
      return db.books;
      
    return db.books.filter(book => book.id === id )
}

const createBook = (parent, {data}, {db, pubsub}, info) => {
    const {writted_by, register_by} = data
    
    const authorExists = db.authors.find(author => author.id === writted_by)

    const userExists = db.users.find(user => user.id === register_by)

    if(!authorExists) throw new Error(`Author does exist`)

    if(!userExists) throw new Error(`user does exist`)

    const book = {
      id: uuidv4(),
      ...data
    }

    db.books.push(book)

    pubsub.publish(`book - ${writted_by}`, 
    {
      book: {
         mutation: 'CREATED',
         data: book
      } 
    })

    return book
}



const updateBook = (parent, {id, data}, {db, pubsub}, info) => {
   const bookExist = db.books.find(books => books.id === id)

   if(!bookExist) throw new Error('book does not exitst')

   const authorExist = db.books.some(author => author.id === bookExist.writted_by)

   if(!authorExist) throw new Error('author does not exitst')

   db.books = db.books.map(book => {
      if(book.id === id){
         book = {
            ...book,
            ...data
         }

         return book
      }
      return book
   })

   const bookUpdated = { ...bookExist, ...data}
   
   pubsub.publish(`book - ${bookExist.writted_by}`, {
      book: {
         mutation: 'UPDATED',
         data: bookUpdated
      }
   })
  
   return bookUpdated
}


const deleteBook = (parent, {id}, {db, pubsub}, info) => {
  
  const bookExist = db.books.find(books => books.id === id)
  if(!bookExist) throw new Error('book not found')

   db.books = db.books.reduce((acc, book) => {
      if(book.id !== id) acc.push(book)

      return acc
   }, [])
   
   pubsub.publish(`book - ${bookExist.writted_by}`, {
      book:{
         mutation: 'DELETED',
         data: bookExist
      }
   })
   return bookExist
}


export default {
  Query: {book},
  Mutation: {createBook, updateBook, deleteBook}
}