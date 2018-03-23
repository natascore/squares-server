import Sequelize from 'sequelize';

const sequelize = new Sequelize('squares', 'admin', 'admin', {
  host: 'postgres',
  dialect: 'postgres',
  define: {
    underscored: true,
  },
});

const models = {
  Square: sequelize.import('./square'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;