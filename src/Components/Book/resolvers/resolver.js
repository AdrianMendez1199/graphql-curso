
import {v4 as uuidv4} from 'uuid'
const book =  (parent, {id}, {db}, info) => {
    if(!id)
      return db.books;
      
    return db.books.filter(book => book.id === id )
}

const createBook = (parent, args, {db}, info) => {
    const {writted_by, register_by} = args
    const authorExists = db.authors.find(author => author.id === writted_by)
    const userExists = db.users.find(user => user.id === register_by)

    if(!authorExists) throw new Error(`Author does exist`)

    if(!userExists) throw new Error(`user does exist`)

    const book = {
      id: uuidv4(),
      ...args
    }

    db.books.push(book)

    return book
}



const updateBook = (parent, args, {db}, info) => {
   const {id, ...data} = args;
   const bookExist = db.books.find(books => books.id === id)

   if(!bookExist) throw new Error('book does exitst')

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
  
   return {
     ...bookExist, ...data
   }
}


const deleteBook = (parent, {id}, {db}, info) => {
  
  const bookExist = db.books.find(books => books.id === id)
  if(!bookExist) throw new Error('book not found')

   db.books = db.books.reduce((acc, book) => {
      if(book.id !== id) acc.push(book)

      return acc
   }, [])

   return bookExist
}


export default {
  Query: {book},
  Mutation: {createBook, updateBook, deleteBook}
}