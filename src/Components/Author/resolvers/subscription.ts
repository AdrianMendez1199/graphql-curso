
import {getUserId} from '../../../utils'

  const author = {
    subscribe(parent: any, args: any, {pubsub, request}: any, info: any) : Object{
      
      getUserId(request)

      return pubsub.asyncIterator('author');
    }
  
}
  

export default {
  Subscription: {author}
}