import {getUserId} from '../../../utils'

const book =  {
    subscribe(parent: any, {authorId, request}: any, {pubsub}: any, info: any){
        // Auth middlewate
        getUserId(request)

        return pubsub.asyncIterator(`book - ${authorId}`)
    }
}

export default {
    Subscription: {book}
}