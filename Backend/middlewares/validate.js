export default function validate(schema) {
  return (req, res, next) => {
    console.log("check",req.body);
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      // Collect default Joi messages
      const errorMessages = error.details.map(detail => detail.message);
        console.log(errorMessages);
      return res.status(400).json({message: "Validation failed", errors: errorMessages });
    }

    next();
  };
}
