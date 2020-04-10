const writted_by = (parent, {id}, {db}, info) => {
    return db.authors.find(author => parent.writted_by === author.id)
}

const register_by = (parent, { id }, { db }, info) => {
    return db.users.find(user => user.id === parent.register_by)
}

export default {
    Book: {writted_by, register_by}
};