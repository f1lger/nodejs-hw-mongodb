import { Contact } from './models/contacts.js';

export const getAllContacts = () =>
  Contact.find({});

export const getContactById = (id) =>
  Contact.findById(id);

export const createContact = (payload) =>
  Contact.create(payload);

export const updateContact = (
  contactId,
  payload,
) =>
  Contact.findByIdAndUpdate(contactId, payload, {
    new: true,
  });

export const deleteContact = (id) =>
  Contact.findByIdAndDelete(id);
