// Validamos el body
export const validateSchemaUtil = async (schema, body) => {
  try {

    console.log(body);
    await schema.validateAsync(body);

  } catch (error) {
    console.log(error.message);
    error.httpStatus = 400; // Bad Request
    error.code = 'SCHEMA_VALIDATION_ERROR';
    throw error;
  }
};
