import Joi from 'joi';

// Joi validation schema for query parameters
const querySchema = Joi.object({
  by_city: Joi.string(),
  by_name: Joi.string(),
  by_type : Joi.string(),

    // Add more parameters as needed
  }).xor('by_city', 'by_name','by_type'); // Ensures at least one of param1 or param2 is present
  
  // Validation middleware
  export const validateQueryParams = (req, res, next) => {
    const { error } = querySchema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next(); // Proceed to the next middleware or route handler if validation passes
  };

  export default validateQueryParams;
  
