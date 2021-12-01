'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Testimonials', [{
      name: 'Testimonial 1',
      image: 'https://i1.sndcdn.com/artworks-000218066450-drfbyj-t500x500.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie eros vel erat consequat sagittis sed et lacus.',
      createdAt: '2021-11-23 14:56:52',
      updatedAt: '2021-11-23 14:56:52',
      deletedAt: '2021-11-23 15:56:52'
    },
    {
      name: 'Testimonial 2',
      image: 'https://i1.sndcdn.com/artworks-000218066450-drfbyj-t500x500.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie eros vel erat consequat sagittis sed et lacus.',
      createdAt: '2021-11-23 14:56:52',
      updatedAt: '2021-11-23 14:56:52',
      deletedAt: '2021-11-23 15:56:52'
    },
    {
      name: 'Testimonial 3',
      image: 'https://i1.sndcdn.com/artworks-000218066450-drfbyj-t500x500.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie eros vel erat consequat sagittis sed et lacus.',
      createdAt: '2021-11-23 14:56:52',
      updatedAt: '2021-11-23 14:56:52',
      deletedAt: '2021-11-23 15:56:52'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Testimonials', null, {});
  }
};
