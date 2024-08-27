import { createPaginationInformation } from '../utils/createPaginationInformation.js';
import { Contact } from '../db/models/contacts.js';
import { saveToCloudinary } from '../utils/saveToCloudinary.js';
import { ENV_VARS } from '../constant/index.js';
import { env } from '../utils/env.js';
import { saveFileToLocaleMachine } from '../utils/saveFileToLocaleMachine.js';

export const getPhotoURL = (file) => {
  if (!file) return;

  if (env(ENV_VARS.IS_CLOUDINARY_ENABLE) === 'true')
    return saveToCloudinary(file);

  return saveFileToLocaleMachine(file);
};

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
  if (typeof userId === 'string') {
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

export const createContact = async (payload) => await Contact.create(payload);

export const updateContact = (filter, payload) => {
  return Contact.findOneAndUpdate(filter, payload, { new: true });
};

export const deleteContact = (id) => Contact.findByIdAndDelete(id);
