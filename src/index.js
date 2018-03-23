import { GraphQLServer } from 'graphql-yoga'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import path from 'path'

import models from './models'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    models
  }),
})

models.sequelize.sync({ }).then(() => {
  server.start(() => console.log('Server is running on http://localhost:4000'))
})

