
const book =  (parent, {id}, {db}, info) => {
    if(!id)
      return db.books;
      
    return db.books.filter(book => book.id === id )
}

const Query = {
  book
}

export default {
  Query,
  Mutation: {}
}