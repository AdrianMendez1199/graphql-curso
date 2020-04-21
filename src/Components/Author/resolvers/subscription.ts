import {getUserId, Context, argsTypes} from '../../../utils'

  const author = {
    subscribe(parent: any, args: argsTypes, ctx: Context) : Object {
       const {pubsub} = ctx;

       // Middleware Auth
       getUserId(ctx.connection.context.authorization)
       return pubsub.asyncIterator('author');
    }
  
}
  

export default {
  Subscription: {author}
}