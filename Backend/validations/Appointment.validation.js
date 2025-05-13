import Joi from 'joi';

export const appointmentSchema=Joi.object({
    userId: Joi.string()
        .length(24)
        .hex()
        .required(),
    department:Joi.string()
        .valid("Electrical", "Sanitation", "Water_Service")
        .required(),
    description: Joi.string().required(),

    appointmentDate: Joi.date().optional(),

    appointmentTime: Joi.string().optional(),
    appointmentStatus: Joi.string()
        .valid("Pending", "In Progress", "Accepted")
        .optional(),
})