// import pkg from 'joi';
// const { boolean } = pkg;
import BaseJoi from 'joi';
import sanitizeHtml from 'sanitize-html';

//joi schema for cleaning html from input and linking models
const extension = (joi) => ({
	type     : 'string',
	base     : joi.string(),
	messages : {
		'string.escapeHTML' : '{{#label}} must not include HTML!'
	},
	rules    : {
		escapeHTML : {
			validate(value, helpers) {
				const clean = sanitizeHtml(value, {
					allowedTags       : [],
					allowedAttributes : {}
				});
				if (clean !== value) return helpers.error('string.escapeHTML', { value });
				return clean;
			}
		}
	}
});

const Joi = BaseJoi.extend(extension);

// linking of models
export const investmentsSchema = Joi.object({
	currency : Joi.object({
		exchange : Joi.string().required().escapeHTML(),
		symbol   : Joi.string().required().escapeHTML(),
		crypto   : Joi.boolean()
	}).required(),
	stock    : Joi.object({
		symbol : Joi.string().escapeHTML(),
		crypto : Joi.boolean()
	}).required()
});

//Add later for reviews
// module.exports.reviewSchema = Joi.object({
//     review: Joi.object({
//         rating: Joi.number().required().min(1).max(5),
//         body: Joi.string().required().escapeHTML()
//     }).required()
// })
