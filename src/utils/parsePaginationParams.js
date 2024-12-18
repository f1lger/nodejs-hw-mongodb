const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';
  if (!isString) return defaultValue;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }

  return parsedNumber;
};

export const parsePaginationParams = ({
  page,
  perPage,
}) => {
  return {
    page: parseNumber(page, 1),
    perPage: parseNumber(perPage, 10),
  };
};
