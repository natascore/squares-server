export default (sequelize, DataTypes) => {
  const Square = sequelize.define('square', {
    status: {
      type: DataTypes.STRING,
    }
  });

  return Square;
};