module.exports = {
  up: async (queryInterface, Sequelize) => {
    const news = [];
    for (let index = 1; index < 38; index++) {
      const novelty = {
        name: `News ${index}`,
        content: `Content news ${index}`,
        image: 'https://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      news.push(novelty);
    }
    await queryInterface.bulkInsert('News', news, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
