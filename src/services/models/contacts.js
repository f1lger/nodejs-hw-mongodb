import { model, Schema } from 'mongoose';

const contactsShema = new Schema(
  {
    name: { type: String, reguired: true },
    phoneNumber: { type: Number, required: true },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      reguired: true,
      default: 'personal',
    },
  },
  { timeseries: true },
);

export const Contact = model(
  'contact',
  contactsShema,
);