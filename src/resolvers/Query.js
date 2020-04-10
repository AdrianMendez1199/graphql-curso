// const Query = {
//     hello: (parent, args, ctx, info) => {
//         const {name} = args
        
//         return name
//     },
    
//    user: (parent, args, ctx, info) => {
//       const {db} = ctx
//       const {id} = args

//       if(!id)
//         return db.users

//         return db.users.filter(user => user.id === id)
//    },

//    author: (parent, {id}, {db}, info) => {
      
//       if(!id)
//         return db.authors

//         return db.authors.filter(author => author.id === id)

//    },

//    book: (parent, {id}, {db}, info) => {
//       if(!id)
//         return db.books;
        
//       return db.books.filter(book => book.id === id )

//    }
// }


  const hello = (parent, args, ctx, info) => {
        const {name} = args
        
        return name
    }
    
   const user = (parent, args, ctx, info) => {
     console.log('parent', parent)
      const {db} = ctx
      const {id} = args

      if(!id)
        return db.users

        return db.users.filter(user => user.id === id)
   }

   const author =  (parent, {id}, {db}, info) => {
      
      if(!id)
        return db.authors

        return db.authors.filter(author => author.id === id);
   }

   const book =  (parent, {id}, {db}, info) => {
      if(!id)
        return db.books;
        
      return db.books.filter(book => book.id === id )
  }

  const Query = {
    book, author, user, hello
  }

export default Query