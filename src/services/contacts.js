import { Contact } from './models/contacts.js';

export const getAllContacts = () =>
  Contact.find({});

export const getContactById = (id) =>
  Contact.findById(id);
