'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Agustin',
          lastName: 'Tafura',
          email: 'agustin_tafura@test.com',
          password:
            '$2b$10$oA9KaOX81D.szm.wG0zPo.QsFIDj0PiYYRwBbGDsL285YZbavAQSK',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Andrea',
          lastName: 'Maccan',
          email: 'andrea_maccan@test.com',
          password:
            '$2b$10$oA9KaOX81D.szm.wG0zPo.QsFIDj0PiYYRwBbGDsL285YZbavAQSK',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Ezequiel',
          lastName: 'Astrada',
          email: 'ezequiel_astrada@test.com',
          password:
            '$2b$10$oA9KaOX81D.szm.wG0zPo.QsFIDj0PiYYRwBbGDsL285YZbavAQSK',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Franco',
          lastName: 'Garancini',
          email: 'franco_garancini@test.com',
          password:
            '$2b$10$oA9KaOX81D.szm.wG0zPo.QsFIDj0PiYYRwBbGDsL285YZbavAQSK',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Joaquin',
          lastName: 'Bascur',
          email: 'bascur@test.com',
          password:
            '$2b$10$oA9KaOX81D.szm.wG0zPo.QsFIDj0PiYYRwBbGDsL285YZbavAQSK',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Juan Pablo',
          lastName: 'Choter',
          email: 'juantablo_ch@test.com',
          password:
            '$2b$10$oA9KaOX81D.szm.wG0zPo.QsFIDj0PiYYRwBbGDsL285YZbavAQSK',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Matias',
          lastName: 'Dalceggio',
          email: 'matias_dalceggio@test.com',
          password:
            '$2b$10$oA9KaOX81D.szm.wG0zPo.QsFIDj0PiYYRwBbGDsL285YZbavAQSK',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Sebastian',
          lastName: 'Galvan',
          email: 'seba_galvan@test.com',
          password:
            '$2b$10$oA9KaOX81D.szm.wG0zPo.QsFIDj0PiYYRwBbGDsL285YZbavAQSK',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Manuel',
          lastName: 'Francisco',
          email: 'manu_f@test.com',
          password:
            '$2b$10$oA9KaOX81D.szm.wG0zPo.QsFIDj0PiYYRwBbGDsL285YZbavAQSK',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Elon',
          lastName: 'Musk',
          email: 'e_musk@test.com',
          password:
            '$2b$10$oA9KaOX81D.szm.wG0zPo.QsFIDj0PiYYRwBbGDsL285YZbavAQSK',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Steeve',
          lastName: 'Jobs',
          email: 'steeve_j@test.com',
          password:
            '$2b$10$oA9KaOX81D.szm.wG0zPo.QsFIDj0PiYYRwBbGDsL285YZbavAQSK',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Mark',
          lastName: 'Zuckerberg',
          email: 'facebook@facebook.com',
          password:
            '$2b$10$oA9KaOX81D.szm.wG0zPo.QsFIDj0PiYYRwBbGDsL285YZbavAQSK',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Satoshi',
          lastName: 'Naka',
          email: 'btc@test.com',
          password:
            '$2b$10$oA9KaOX81D.szm.wG0zPo.QsFIDj0PiYYRwBbGDsL285YZbavAQSK',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Charles',
          lastName: 'Xavier',
          email: 'xavier@xmen.com',
          password:
            '$2b$10$OnbtPOPkErie7wzZ9hvwaObUcZmIflVD4TwtRcouOxOuscz5nK54S',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
