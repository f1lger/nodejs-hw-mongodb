import { Router } from 'express';
import {
  createContactsController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactsController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactShema,
  updateContactShema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();

contactsRouter.use('/:contactId', isValidId);
contactsRouter.use('/', authenticate);
contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '/',
  validateBody(createContactShema),
  ctrlWrapper(createContactsController),
);

contactsRouter.patch(
  '/:contactId',
  validateBody(updateContactShema),
  ctrlWrapper(updateContactsController),
);

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));
export default contactsRouter;
