const extractSchemaErrors = schemaErrors =>
    Object.entries(schemaErrors.errors).reduce(
        (errors, [key, error]) => ({ errors: [...errors.errors, [key, error.message]] }),
        { errors: [] }
    );

export default extractSchemaErrors;
