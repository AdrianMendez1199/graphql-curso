import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const SECRET = 'Judoneyba*12345'


export type Context = {
    request?: any
    prisma?:  any
    pubsub?:  any
    connection?: any
}


export type argsTypes = {
    id?:    number
    data?:  any
    first?: number 
    skip?:  number
    orderBy?: string
} 


  
export function getUserId (request: any) : number {
    let header: string = request

     if (typeof request == "object")
          header = request.get('authorization')

     if(!header)
        throw new Error(`Authentication required`)

     const token: string = header.replace('Bearer ', '')
     const {userId} : any = jwt.verify(token, SECRET)
     return userId
}

export async function hashPassword (password: string): Promise<string>  {
    if (password.length < 6)
            throw Error(`Password must be 6 characters or longer`)

    const salt = await bcrypt.genSalt(10)

    return bcrypt.hash(password, salt)
}


export async function  validatePassword  (requestPassword: string, password: string):  Promise<boolean>  {
    return await bcrypt.compare(requestPassword, password)
}


export function generateToken  (userId: string) : string {
    return jwt.sign({userId}, SECRET, {expiresIn: '2 days'})
}


