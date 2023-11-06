import Joi from "joi";

// Joi validation schema for query parameters
const querySchema = Joi.object({
  rating: Joi.number(),
  review: Joi.string(),

  // Add more parameters as needed
});

// Validation middleware
export const validateQueryParams = (req, res, next) => {
  const { error } = querySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next(); // Proceed to the next middleware or route handler if validation passes
};

export default validateQueryParams;
