import {
  SORT_ORDER,
  CONTACT_KEYS,
} from '../constant/index.js';

const parseSortOrder = (sortOrder) => {
  if (
    [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(
      sortOrder,
    )
  )
    return sortOrder;
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  if (CONTACT_KEYS.includes(sortBy))
    return sortBy;

  return '_id';
};

export const parseSortParams = ({
  sortBy,
  sortOrder,
}) => {
  return {
    sortBy: parseSortBy(sortBy),
    sortOrder: parseSortOrder(sortOrder),
  };
};
