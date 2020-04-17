import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const SECRET = 'Judoneyba*12345'


const getUserId = () => {
    return 'Hello Word'
}

const hashPassword = async (password) => {
    if (password.length < 6)
            throw Error(`Password must be 6 characters or longer`)

    const salt = await bcrypt.genSalt(10)

    return bcrypt.hash(password, salt)
}


const validatePassword = async (requestPassword, password) => {
    return await bcrypt.compare(requestPassword, password)
}


const generateToken = (userId) => {
    return jwt.sign({userId}, SECRET, {expiresIn: '2 days'})
}


export {
    generateToken, validatePassword, hashPassword, getUserId
}