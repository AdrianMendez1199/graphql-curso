
  const author = {
    subscribe(parent, args, {pubsub}, info) {
      return pubsub.asyncIterator('author');
    }
  
}
  

export default {
  Subscription: {author}
}