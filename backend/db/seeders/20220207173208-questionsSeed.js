'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Questions', [
      { title: 'Who is stronger Batman or Superman?', content: 'Alot of people will say Superman is strong because well, hes superman. However how did Batman beat Superman in the movies and commics? Is his IQ that huge that its able to over come Superman or is it because Superman has a glarying weekness which is Kryptonite?', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Who is stronger Batman or Ironman?', content: 'Batman and Ironman are very similar it many different ways but who is the stronger person? I feel Batman doesn\'t have the tools in his belt to overcome Ironman\'s arsenal. IQ doesn\'t come into play becase they are both equally smart. ', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Who is DC\'s equivalent to Marvel\'s The one above all?', content: 'I dont know about DC, but I would like to know if there\'s a character equivalent to The one above all.', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Other than Marvel and DC?', content: 'I never got into other comics but I\'d like to venture out into others', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Who is the strongest character??', content: 'Is it The one above all or The Presence', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Can Ironman beat Superman?', content: 'I think Ironman, just like Batman, would be able to get the job done. I personally think Ironman is stronger than Batman since he has more tools in his belt, but will it go the same way?', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Why are Marvel animation so trash?', content: 'I dont understand why companies keep pumping out these trash animation', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Why are Justice League films so trash?', content: 'They need to take a page off of Disney', userId: 3, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
