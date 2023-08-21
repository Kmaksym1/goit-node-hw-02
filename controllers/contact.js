const { HttpError, ctrlWrapper } = require("../helpers/");
const {
  getAllContacts,
  getById,
  createContact,
  deleteContact,
  updateContact,
} = require("../services/contact");

const getContactsList = async (req, res) => {
  const contacts = await getAllContacts();
  // res.json(contacts);
  res.render("contacts", { contacts });
};

const getContactsById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await deleteContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

const addContact = async (req, res) => {
  const result = await createContact(req.body);
  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getContactsList: ctrlWrapper(getContactsList),
  getContactsById: ctrlWrapper(getContactsById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
