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

 export default {
  Query: {author},
 }