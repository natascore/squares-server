import { pubsub } from '../pubsub'

const SQUARE_CHANGED_TOPIC = 'square_changed'
const SQUARE_ADDED_TOPIC = 'square_added'

export default {
  Query: {
    getSquare: (parent, { id }, { models }) => models.Square.findOne({ where: { id } }),
    allSquares: (parent, args, { models }) => models.Square.findAll({ order: models.sequelize.col('id') }),
  },
  Mutation: {
    createSquare: async (partent, args, { models }) => {
      const square = await models.Square.create(args)
      pubsub.publish(SQUARE_ADDED_TOPIC, { squareAdded: square })
      return square
    },
    updateSquare: async (parent, { id, status }, { models }) => {
      pubsub.publish(SQUARE_CHANGED_TOPIC, { squareChanged: { id, status } })
      await models.Square.update({ status }, { where: { id } } )
      return models.Square.findOne({ where: { id } } )
    }
  },
  Subscription: {
    squareChanged : {
      subscribe: (parent, args, context, info) => pubsub.asyncIterator(SQUARE_CHANGED_TOPIC),
    },
    squareAdded : {
      subscribe: (parent, args, context, info) => pubsub.asyncIterator(SQUARE_ADDED_TOPIC),
    }
  },
}