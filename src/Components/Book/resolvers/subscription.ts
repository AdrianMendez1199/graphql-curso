import {getUserId} from '../../../utils'

const book =  {
    subscribe(parent: any, params: any, {pubsub, request}: any, info: any): Function {
        const {authorId} : any = params
        // Auth middlewate
        getUserId(request)

        return pubsub.asyncIterator(`book - ${authorId}`)
    }
}

export default {
    Subscription: {book}
}