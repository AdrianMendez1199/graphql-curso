import {getUserId} from '../../../utils'

  const author = {
    subscribe(parent: any, args: any, ctx: any, info: any) : Object {
       const {pubsub} = ctx;

       // Middleware Auth
       getUserId(ctx.connection.context.authorization)
       
       return pubsub.asyncIterator('author');
    }
  
}
  

export default {
  Subscription: {author}
}