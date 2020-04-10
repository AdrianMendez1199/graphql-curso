
 const register_by = (parent, {id}, {db}, info) => {
     return db.users.find(user => parent.register_by === user.id)
 }

 const books = (parent, {id}, {db}, info) => {
    return db.books.filter(book => book.writted_by === parent.id)
}

const Author = {
    register_by, 
    books
}

export default Author;