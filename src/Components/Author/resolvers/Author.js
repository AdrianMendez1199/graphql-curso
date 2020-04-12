
 const register_by = (parent, {id}, {prisma}, info) => {
    return prisma.users.findOne({
        where: {
            id,
        }
    })
}

const books = (parent, {id}, {prisma}, info) => {
    return prisma.books.findOne({
        where: {
            id,
        }
    })
}

export default {
    Author: {register_by, books}
};