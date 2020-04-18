
import {getUserId} from '../../../utils/'

  const author = {
    subscribe(parent, args, {pubsub, request}, info) {
      
      getUserId(request)

      return pubsub.asyncIterator('author');
    }
  
}
  

export default {
  Subscription: {author}
}