import { CONTACT_TYPE_VALUES } from '../constant/index.js';

const parseType = (contactType) =>
  CONTACT_TYPE_VALUES.includes(contactType)
    ? contactType
    : null;

const parseIsFavourite = (isFavourite) => {
  if (!['true', 'false'].includes(isFavourite))
    return;
  return isFavourite === 'true' ? true : false;
};

export const parseFiltersParams = ({
  contactType,
  isFavourite,
}) => {
  const parsedType = parseType(contactType);

  const parsedIsFavourite =
    parseIsFavourite(isFavourite);

  const filter = {};

  if (parsedType) filter.contactType = parseType(contactType);

  if (typeof parsedIsFavourite === 'boolean')
    filter.isFavourite =
      parseIsFavourite(isFavourite);

  return filter;
};
