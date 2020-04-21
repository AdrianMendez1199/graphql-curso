import {getUserId, argsTypes, Context} from '../../../utils'

const book =  {
    subscribe(parent: any, args: argsTypes, ctx: Context): Object {
        const {authorId}: any = args
        const {pubsub} = ctx
        const token : string = ctx.connection.context.authorization

        // Auth middlewate
        getUserId(token)
        return pubsub.asyncIterator(`book - ${authorId}`)
    }
}

export default {
    Subscription: {book}
}