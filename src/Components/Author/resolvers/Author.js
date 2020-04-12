
 const register_by = (parent, {id}, {prisma}, info) => {
    return prisma.users.findOne({
        where:{
            id: parent.id
        }
    }).register_by()
}

const books = (parent, {id}, {db}, info) => {
    return prisma.books.findOne({
        where:{
            id: parent.id
        }
    }).books()
}

export default {
    Author: {register_by, books}
};