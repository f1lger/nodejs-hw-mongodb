import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

export const getAllContactsController = async (
  req,
  res,
  next,
) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (
  req,
  res,
  next,
) => {
  const contacts = await getContactById(
    req.params.contactId,
  );
  if (!contacts) {
    next(
      createHttpError(404, 'Contacts not found'),
    );
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${req.params.contactId}`,
    data: contacts,
  });
};

export const createContactsController = async (
  req,
  res,
  next,
) => {
  const contacts = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contacts,
  });
};

export const updateContactsController = async (
  req,
  res,
  next,
) => {
  const contacts = await updateContact(
    req.params.contactId,
    req.body,
  );

  if (!contacts)
    return next(
      createHttpError(404, 'Contact not found'),
    );

  res.status(200).json({
    status: 200,
    message: 'Successfully created a contact!',
    data: contacts,
  });
};

export const deleteContactController = async (
  req,
  res,
  next,
) => {
  const contact = await deleteContact(
    req.params.contactId,
  );

  if (!contact)
    return next(
      createHttpError(404, 'Contact not found'),
    );

  res.status(204).json();
};
