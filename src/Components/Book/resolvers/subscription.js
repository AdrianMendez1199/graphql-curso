const book =  {
    subscribe(parent, {authorId}, {pubsub}, info){
        return pubsub.asyncIterator(`book - ${authorId}`)
    }
}

export default {
    Subscription: {book}
}