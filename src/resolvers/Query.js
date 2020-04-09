const Query = {
    hello: (parent, args, ctx, info) => {
        const {name} = args;
        
        return name
    },
    
   user: (parent, args, ctx, info) => {
      const {db} = ctx;
      const {id} = args;

      if(!id)
        return db.users;

        return db.users.filter(user => user.id === id)
   }
}


export default Query