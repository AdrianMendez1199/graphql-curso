const writted_by = (parent, {id}, {prisma}, info) => {
    return prisma.authors.findOne({
        where:{
            id,
        }
    }).writted_by()
}

const register_by = (parent, { id }, { prisma }, info) => {
    return prisma.authors.findOne({
        where:{
            id,
        }
    }).register_by()
}

export default {
    Book: {writted_by, register_by}
};