
 const register_by = (parent, {id}, {prisma}, info) => {
    return prisma.authors.findOne({
        where:{
            id: Number(parent.id)
        }
    }).users()
}

const books = (parent, {id}, {prisma}, info) => {
    return prisma.books.findOne({
        where:{
            id: Number(parent.id)
        }
    }).authors()
}

export default {
    Author: {register_by, books}
};