import { createPaginationInformation } from '../utils/createPaginationInformation.js';
import { Contact } from './models/contacts.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy = '_id',
  sortOrder = 'asc',
  filter,
}) => {
  const skip = perPage * (page - 1);

  const contactsQuery = Contact.find();

  if (filter.contactType) {
    contactsQuery
      .where('contactType')
      .equals(filter.contactType);
  }
  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery
      .where('isFavourite')
      .equals(filter.isFavourite);
  }

  const [contactsCount, contacts] =
    await Promise.all([
      Contact.find()
        .merge(contactsQuery)
        .countDocuments(),
      contactsQuery
        .skip(skip)
        .limit(perPage)
        .sort({ [sortBy]: sortOrder })
        .exec(),
    ]);

  const paginationIndormation =
    createPaginationInformation(
      page,
      perPage,
      contactsCount,
    );

  return {
    contacts: contacts,
    totalItems: contactsCount,
    ...paginationIndormation,
  };
};
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
