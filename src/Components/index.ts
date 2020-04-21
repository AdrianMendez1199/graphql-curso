import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const typesArrays: string[] = fileLoader(path.join(__dirname, './**/schema.graphql'), { recursive: true });

const resolversArray: any[] = fileLoader(path.join(__dirname, './**/resolvers/**/'), { recursive: true });

export const types: string = mergeTypes(typesArrays, { all: true });
export const resolvers: any = mergeResolvers(resolversArray);



