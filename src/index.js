import { initMongoDB } from './db/initMongoDB.js';
import { Contact } from './services/models/contacts.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  await initMongoDB();
  const Contacts = await Contact.find({}); // await
  console.log(Contacts);
  setupServer();
};

bootstrap();
