import { createPaginationInformation } from '../utils/createPaginationInformation.js';
import { Contact } from '../db/models/contacts.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy = '_id',
  sortOrder = 'asc',
  filter,
  userId,
}) => {
  const skip = perPage * (page - 1);

  const contactsQuery = Contact.find({});

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (typeof userId === 'object') {
    contactsQuery.where('userId').equals(userId);
  }

  const contacts = await contactsQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const contactsCount = await Contact.find()
    .merge(contactsQuery)
    .countDocuments();

  const paginationIndormation = createPaginationInformation(
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
export const getContactById = ({ _id, userId }) =>
  Contact.findOne({ _id, userId });

export const createContact = (payload, userId) =>
  Contact.create({ ...payload, userId });

export const updateContact = ({ _id, userId }, payload) =>
  Contact.findOneAndUpdate({ _id, userId }, payload, { new: true });

export const deleteContact = (id) => Contact.findByIdAndDelete(id);
