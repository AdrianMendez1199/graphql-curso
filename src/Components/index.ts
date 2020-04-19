import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const typesArrays = fileLoader(path.join(__dirname, './**/schema.graphql'), { recursive: true });

const resolversArray = fileLoader(path.join(__dirname, './**/resolvers/**/'), { recursive: true });

export const types: any = mergeTypes(typesArrays, { all: true });
export const resolvers: any = mergeResolvers(resolversArray);


