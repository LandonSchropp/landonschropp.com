const Joi = require('joi');

module.exports = Joi
  .object()
  .unknown(true)
  .keys({
    title: Joi.string().required(),
    author: Joi.string().required(),
    type: Joi.string().valid("article", "video", "podcast", "talk", "liveTalk"),
    link: Joi.when('type', {
      is: Joi.not("liveTalk"),
      then: Joi.string().uri().required()
    }),
    site: Joi.when('type', {
      is: Joi.not("liveTalk"),
      then: Joi.string().required()
    }),
    location: Joi.when('type', {
      is: 'liveTalk',
      then: Joi.string().required()
    }),
    embedURL: Joi.when('type', {
      is: Joi.valid('podcast', 'talk', 'video'),
      then: Joi.string().uri().required()
    })
  });
