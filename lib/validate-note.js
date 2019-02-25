const noteDataSchema = require('./note-data-schema');
const Joi = require('joi');

module.exports = function validateNote({ inputPath, data }) {

  let { error } = Joi.validate(data, noteDataSchema);

  if (error) {
    throw new Error(
      `An error occurred when validating the note ${ inputPath }: ${ error.message }`
    );
  }
};
