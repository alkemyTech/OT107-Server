'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const members = [
      {
        name: 'Member',
        facebookUrl: 'https://www.facebook.com/Member',
        instagramUrl: 'https://www.linkedin.com/in/Member',
        linkedinUrl: 'https://www.instagram.com/Member',
        image: 'MemberPic.jpeg',
        description: 'descripcion corresponde al miembro numero: 1'
      }
    ];
    for (let i = 0; i < 10; i++) {
      const member = {
        name: `Member ${i}`,
        facebookUrl: `https://www.facebook.com/Member${i}`,
        instagramUrl: `https://www.linkedin.com/in/Member${i}`,
        linkedinUrl: `https://www.instagram.com/Member${i}`,
        image: `Member${i}Pic.jpeg`,
        description: `descripcion corresponde al miembro numero: ${i + 1}`
      };
      members.push(member);
    }
    await queryInterface.bulkInsert(
      'Members',
      members,
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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
