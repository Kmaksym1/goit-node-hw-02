const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers/");


const get = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};
const getContactsById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};
const addContact = async (req, res) => {

  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  get: ctrlWrapper(get),
  getContactsById: ctrlWrapper(getContactsById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
};
