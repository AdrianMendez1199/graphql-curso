import {getUserId} from '../../../utils/'

const book =  {
    subscribe(parent, {authorId, request}, {pubsub}, info){
        // Auth middlewate
        getUserId(request)

        return pubsub.asyncIterator(`book - ${authorId}`)
    }
}

export default {
    Subscription: {book}
}