import Joi from 'joi';

const complaintSchema=Joi.object({
    userId: Joi.string()
        .length(24)
        .hex()
        .required(),
    category:Joi.string()
        .valid("Electrical", "Sanitation", "Water_Service")
        .required(),
    email:Joi.string()
        .email()
        .required(),
    phone:Joi.string()
        .pattern(/^\d{10}$/)
        .required(),
    description:Joi.string().required(),
    status: Joi.string()
        .valid("Pending", "Rejected", "Accepted", "Processing", "Resolved")
        .default("Pending"),
    imageUrl: Joi.string()
        .uri()
        .optional()
        .allow(null, "")

});
export default complaintSchema;
