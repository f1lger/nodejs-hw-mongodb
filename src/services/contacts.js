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

  const contactsQuery = Contact.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  contactsQuery.where('parentId').equals({ userId });
  console.log(contactsQuery.where('parentId').equals(userId));

  const contactsCount = await Contact.find()
    .merge(contactsQuery)
    .countDocuments();
  const contacts = await contactsQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();

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
export const getContactById = (id) => Contact.findById(id);

export const createContact = (payload, userId) =>
  Contact.create({ ...payload, parentId: userId });

export const updateContact = (filter, payload) =>
  Contact.findByIdAndUpdate(filter, payload, { new: true });

export const deleteContact = (id) => Contact.findByIdAndDelete(id);
