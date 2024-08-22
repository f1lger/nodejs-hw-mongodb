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

export const getAllContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFiltersParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
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
  const contacts = await createContact(req.body, req.user._id);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contacts,
  });
};

export const updateContactsController = async (req, res, next) => {
  const contacts = await updateContact(
    { _id: req.params.contactId, userId: req.user._id },
    req.body,
  );

  if (!contacts) return next(createHttpError(404, 'Contact not found'));

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contacts,
  });
};

export const deleteContactController = async (req, res, next) => {
  const contact = await deleteContact({
    _id: req.params.contactId,
    userId: req.user._id,
  });

  if (!contact) return next(createHttpError(404, 'Contact not found'));

  res.status(204).json();
};
