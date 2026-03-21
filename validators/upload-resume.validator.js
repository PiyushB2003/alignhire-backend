import joi from "joi";

export const uploadResumeSchema = {
    body: joi.object({
        id: joi.string().required().messages({
            "string.base": "ID must be a string",
            "string.empty": "ID is required",
            "any.required": "ID is required"
        })
    }),

    file: joi.object({
        originalname: joi.string().required().messages({
            "string.base": "File name must be a string",
            "string.empty": "File name is required",
            "any.required": "File name is required"
        }),

        mimetype: joi.string()
            .valid(
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            )
            .required()
            .messages({
                "string.base": "File type must be a string",
                "any.only": "Only PDF or Word documents are allowed",
                "any.required": "File type is required"
            }),

        size: joi.number().max(5 * 1024 * 1024).required().messages({
            "number.base": "File size must be a number",
            "number.max": "File size must be less than 5MB",
            "any.required": "File size is required"
        })
    })
        .required()
        .messages({
            "any.required": "Resume file is required"
        })
};