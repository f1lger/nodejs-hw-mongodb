import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFiltersParams } from '../utils/parseFilters.js';
import { env } from '../utils/env.js';
import { saveToCloudinary } from '../utils/saveToCloudinary.js';
import { ENV_VARS } from '../constant/index.js';
import { saveFileToLocaleMachine } from '../utils/saveFileToLocaleMachine.js';

export const getPhotoURL = (file) => {
  if (!file) return;
  
  if (env(ENV_VARS.IS_CLOUDINARY_ENABLE) === 'true')
    return saveToCloudinary(file);

  return saveFileToLocaleMachine(file);
};

export const getAllContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFiltersParams(req.query);
  const userId = String(req.user._id);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const contacts = await getContactById({
    _id: req.params.contactId,
    userId: req.user._id,
  });
  if (!contacts) {
    return next(createHttpError(404, 'Contacts not found'));
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${req.params.contactId}`,
    data: contacts,
  });
};

export const createContactsController = async (req, res, next) => {
  const photo = await getPhotoURL(req.file);
  const contacts = await createContact({
    ...req.body,
    photo,
    userId: req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contacts,
  });
};

export const updateContactsController = async (req, res, next) => {
  const photo = await getPhotoURL(req.file);

  const contacts = await updateContact(
    { _id: req.params.contactId, userId: req.user._id },
    { ...req.body, photo },
  );

  if (!contacts) return next(createHttpError(404, 'Contact not found'));

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contacts,
  });
};

export const deleteContactController = async (req, res, next) => {
  const contact = await deleteContact(req.params.contactId);

  if (!contact) return next(createHttpError(404, 'Contact not found'));

  res.status(204).json();
};
