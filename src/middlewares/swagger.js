import createHttpError from 'http-errors';
import fs from 'node:fs';
import swaggerUi from 'swagger-ui-express';
import { SWAGGER_PATH } from '../constant/index.js';

export const swagger = () => {
  try {
    const swaggerDocument = JSON.parse(
      fs.readFileSync(SWAGGER_PATH).toString(),
    );
    return [swaggerUi.serve, swaggerUi.setup(swaggerDocument)];
  } catch {
    return (req, res, next) => {
      next(createHttpError(500, 'Cant load swagger docs'));
    };
  }
};
