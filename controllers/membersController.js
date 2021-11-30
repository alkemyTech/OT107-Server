const serviceMember = require('../services/members');

module.exports = {

  getAll: async (req, res) => {
    const allMembers = await serviceMember.getAll();

    res.status(200).json(allMembers);
  }

};
