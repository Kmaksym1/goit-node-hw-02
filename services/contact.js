// Робота з базою даних - запити

const { Contact } = require("../shemas/contacts");

const getAllContacts = async () => {
  return Contact.find();
};

const getById = async (id) => {
  return Contact.findOne({ _id: id });
};

const deleteContact = async (id) => {
  return Contact.findOneAndRemove({ _id: id });
};
const createContact = async ({ name, phone, email }) => {
  return Contact.create({ name, phone, email });
};
const updateContact = async (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

module.exports = {
  getAllContacts,
  getById,
  deleteContact,
  createContact,
  updateContact,
};
