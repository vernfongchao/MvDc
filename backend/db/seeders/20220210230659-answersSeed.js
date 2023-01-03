'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    options.tableName = 'Answers'
    return queryInterface.bulkInsert(options, [
      { content: 'As someone who has been a lifelong fan of both Batman and Superman, I will have to say that it\'s Batman who wins. Superman could use any one of his powers to annihilate Batman completely. Batman could prepare for any eventuality, but what will he do when Superman decides to incinerate him from space? Or at ten times the speed of sound? Of course, the caveat here is that this reasoning works for a duel between the best humanity has to offer and the gold standard of a kryptonian. Who would win in a fight between a kryptonian and a human if the battle takes place on earth? The kryptonian. The odds of Deathstroke defeating Zod in an one-on-one is practically zero. But that\'s not the question. Not really.', userId: 1, questionId: 1, createdAt: new Date(), updatedAt: new Date() },
      { content: 'In a world where Batman and Iron Man co-exist, Batman already has a plan to take down Iron Man. Not just Iron Man, he has a plan to bring down the Avengers. Sounds far-fetched but it isn\'t. In an episode of Justice League, Batman is shown carrying Kryptonite in his belt as insurance in case Superman goes rogue. That is his level of paranoia when it comes to his own teammates. In the comic book, JLA: Tower of Babel, it is revealed that he has contingency plans to stop the Justice League in case it goes rogue. If an unprepared Batman goes against Iron Man, he will lose. He will most probably lose to every superhero out there. The thing is, there is no such thing as an unprepared Batman.', userId: 3, questionId: 2, createdAt: new Date(), updatedAt: new Date() },
      { content: 'Basically, just substitute "God" for "The Presence" (or, if it\'s Marvel, "God" for the "One Above All") and you\'ve got the story.', userId: 1, questionId: 3, createdAt: new Date(), updatedAt: new Date() },
      { content: 'Back in the early days of comics, Marvel (known as Timely) was just another struggling company, among which were Fox Feature Syndicate, Quality Comics, Charlton Comics, Centaur Publishing, Harvey Comics (who later was known for Richie Rich), MLJ Publications (later known as Archie Publications), Better Publications, Prize Publications, Ace Magazines, Holyoke Publishing Company, Columbia Comics Group, all by 1940! Even more came in the succeeding years.', userId: 2, questionId: 4, createdAt: new Date(), updatedAt: new Date() },
      { content: 'Both because they are equivelent characters in different universals.', userId: 3, questionId: 5, createdAt: new Date(), updatedAt: new Date() },
      { content: 'Conceivably, yes. Iron Man is considered one of the smartest engineers in the Marvel Universe, as well as an excellent strategist and planner (maybe not quite to Batman\'s level but he is pretty good). We are talking about a guy who built his first Iron Man suit in a cave with a bunch of scraps. Then when he got home, proceeded to go beserk in building new armors. Hulkbuster, Galactusbuster, Phoenixbuster, Thorbuster, Godkiller Mark II, Bleeding Edge, Endosym, and Model Prime to name a few of his most powerful. His base strength stat is at 100 tons, the highest level of strength in the MU, and his base speeds are faster than the speed of sound, Mach 1. He has actually broken the light barrier before, multiple times actually. His durability is such that he can fight the Hulk and Thor on level playing fields, and take multiple nukes to the face at once. He has fought Celestials, Thanos, and Galactus, as well as breaking the Phoenix force, a creation/destruction entity of the universe, into five pieces! Iron Man should not be underestimated in any capacity.', userId: 1, questionId: 6, createdAt: new Date(), updatedAt: new Date() },
      { content: 'I honestly don\'t think the movie sucked. I think it could have been better, but I don\'t think it sucked. It failed in some areas, and I believe that\'s where people get the idea that the movie sucked. In reality, it\'s not a bad movie, but it doesn\'t live up to the first Avengers, the second Avengers, hell, it doesn\'t even live up to Infinity War and I hated that movie (but again, I liked Justice League).', userId: 2, questionId: 8, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    options.tableName = 'Answers'
    return queryInterface.bulkDelete(options);
  }
};
