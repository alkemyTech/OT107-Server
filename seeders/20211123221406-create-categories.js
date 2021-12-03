'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: "Category 1",
        description : "Description of a generic category.",
        image: "image01.jpg",
        updatedAt : new Date,
        createdAt: new Date,
      },
      {
        name: "Category 2",
        description : "Description of a generic category.",
        image: "image02.jpg",
        updatedAt : new Date,
        createdAt: new Date,
      },
      {
        name: "Category 3",
        description : "Description of a generic category.",
        image: "image03.jpg",
        updatedAt : new Date,
        createdAt: new Date,
      },
      {
        name: "news",
        description : "News category.",
        image: "image04.jpg",
        updatedAt : new Date,
        createdAt: new Date,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([

      queryInterface.bulkDelete('Categories', null,{})

    ]);
  }
};
