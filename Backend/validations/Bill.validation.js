import Joi from 'joi';

const billSchema=Joi.object({
    userId:Joi.string()
        .length(24)
        .required()
        .hex(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
    bill_number: Joi.string().required(),
    billType: Joi.string()
        .valid("Electrical", "Sanitation", "Water_Service")
        .required(),
    total_amount: Joi.number().required(),
    payment_status:Joi.string()
        .valid("Paid", "Unpaid", "OverDue")
        .optional(),
    payment_method:Joi.string()
        .valid("Cash", "CreditCard", "DebitCard", "NetBanking", "Upi", "Other")
        .optional(),
    dueDate:Joi.date()
        .required()
});
export default billSchema;