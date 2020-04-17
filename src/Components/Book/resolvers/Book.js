const writted_by = (parent, {id}, {prisma}, info) => {
    return prisma.books.findOne({
        where:{
            id: Number(parent.id),
        }
    }).authors()
}

const register_by = (parent, { id }, { prisma }, info) => {
    return prisma.books.findOne({
        where:{
            id: Number(parent.id),
        }
    }).users()
}

export default {
    Book: {writted_by, register_by}
};