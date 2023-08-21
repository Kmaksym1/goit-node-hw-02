const express = require("express");
const router = express.Router(); 
const { getContactsList, getContactsById, removeContact, addContact, updateFavorite, updateContactById } = require ("../../controllers/contact");

const { validateBody } = require("../../middlewares");

const {addSchema, updateFavoriteSchema} = require("../../shemas/contacts");

router.get("/all", getContactsList);

router.get("/:contactId", getContactsById);

router.post('/', validateBody(addSchema), addContact);

router.put("/:contactId", validateBody(addSchema), updateContactById);

router.patch("/:contactId/favorite", validateBody(updateFavoriteSchema), updateFavorite)

router.delete("/:contactId", removeContact);

module.exports = router;
