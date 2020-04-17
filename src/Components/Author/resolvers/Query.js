import 'babel-polyfill';

const author = (parent, {id}, {prisma}, info) => {
    if(!id)
      return prisma.authors.findMany()

      return prisma.authors.findOne({
        where:{
          id: Number(id),
        }
      });
 }

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
  Query: {author},
  Author: {register_by, books}
 }


