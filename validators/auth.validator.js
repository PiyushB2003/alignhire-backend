import joi from "joi";

export const registerSchema = {
    body: joi.object({
        name: joi.string().min(3).max(50).required().messages({
            "string.base": "Name must be a string",
            "string.empty": "Name is required",
            "string.min": "Name must be at least 3 characters",
            "string.max": "Name must not exceed 50 characters",
            "any.required": "Name is required"
        }),

        email: joi.string().email().required().messages({
            "string.base": "Email must be a string",
            "string.email": "Please enter a valid email address",
            "string.empty": "Email is required",
            "any.required": "Email is required"
        }),

        password: joi.string().min(6).required().messages({
            "string.base": "Password must be a string",
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters",
            "any.required": "Password is required"
        }),

        confirmPassword: joi.string()
            .valid(joi.ref("password"))
            .required()
            .messages({
                "string.base": "Confirm password must be a string",
                "string.empty": "Confirm password is required",
                "any.required": "Confirm password is required",
                "any.only": "Passwords do not match"
            })
    }).messages({
        "object.base": "Request body must be an object"
    })
};

export const verifyOtpSchema = {
    body: joi.object({
        email: joi.string().email().required().messages({
            "string.base": "Email must be a string",
            "string.email": "Please enter a valid email",
            "string.empty": "Email is required",
            "any.required": "Email is required"
        }),

        otp: joi.string().required().messages({
            "string.base": "OTP must be a string",
            "string.empty": "OTP is required",
            "any.required": "OTP is required"
        })
    })
};

export const resendOtpSchema = {
    body: joi.object({
        email: joi.string().email().required().messages({
            "string.base": "Email must be a string",
            "string.email": "Please enter a valid email",
            "string.empty": "Email is required",
            "any.required": "Email is required"
        })
    })
};

export const loginSchema = {
    body: joi.object({
        email: joi.string().email().required().messages({
            "string.base": "Email must be a string",
            "string.email": "Please enter a valid email",
            "string.empty": "Email is required",
            "any.required": "Email is required"
        }),

        password: joi.string().required().messages({
            "string.base": "Password must be a string",
            "string.empty": "Password is required",
            "any.required": "Password is required"
        })
    })
};

export const forgotPasswordSchema = {
    body: joi.object({
        email: joi.string().email().required().messages({
            "string.base": "Email must be a string",
            "string.email": "Please enter a valid email",
            "string.empty": "Email is required",
            "any.required": "Email is required"
        })
    })
};

export const resetPasswordSchema = {
    params: joi.object({
        token: joi.string().required().messages({
            "string.base": "Token must be a string",
            "string.empty": "Token is required",
            "any.required": "Token is required"
        })
    }),

    body: joi.object({
        newPassword: joi.string().min(6).required().messages({
            "string.base": "New password must be a string",
            "string.empty": "New password is required",
            "string.min": "New password must be at least 6 characters",
            "any.required": "New password is required"
        }),

        confirmPassword: joi.string()
            .valid(joi.ref("newPassword"))
            .required()
            .messages({
                "string.base": "Confirm password must be a string",
                "string.empty": "Confirm password is required",
                "any.required": "Confirm password is required",
                "any.only": "Passwords do not match"
            })
    })
};