const writted_by = (parent, {id}, {prisma}, info) => {
    return prisma.authors.findOne({
        where:{
            id,
        }
    })
}

const register_by = (parent, { id }, { prisma }, info) => {
    return prisma.authors.findOne({
        where:{
            id,
        }
    })
}

export default {
    Book: {writted_by, register_by}
};