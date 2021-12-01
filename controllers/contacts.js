const contactsService = require('../services/contacts');

const getAll = async (req, res, next) => {
  try {
<<<<<<< HEAD
    const contacts = await contactsService.getAll();
    res.status(200).json({ data: contacts });
  } catch (e) {
=======
	const contacts = await contactsService.getAll();
	res.status(200).json(contacts);
  }catch(e){
>>>>>>> origin/dev
    next(e);
  }
};

module.exports = {
<<<<<<< HEAD
  getAll
=======
	getAll
>>>>>>> origin/dev
};
