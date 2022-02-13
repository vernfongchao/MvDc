'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Comments', [
      { content: 'I\'m not too sure about that people always say that Batman is too smart. Superman at his strongest can destroy earth with 1 punch so I highly doubt this answer.', userId: 3, answerId: 1, createdAt: new Date(), updatedAt: new Date() },
      { content: 'Right... Batman is so much more intelligent than Ironman that its an easy win for him...', userId: 3, answerId: 2, createdAt: new Date(), updatedAt: new Date() },
      { content: 'This man is crazy right?', userId: 2, answerId: 2, createdAt: new Date(), updatedAt: new Date() },
      { content: 'Marvels the best though', userId: 1, answerId: 4, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
