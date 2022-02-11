'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Question.associate = function (models) {
    // associations can be defined here
    Question.belongsTo(models.User, { foreignKey: 'userId' });
    Question.hasMany(models.Answer, { onDelete: 'cascade', hooks: true, foreignKey: 'questionId' });
  };
  return Question;
};