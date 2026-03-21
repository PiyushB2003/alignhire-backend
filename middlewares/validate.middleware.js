import joi from "joi";

export const validate = (schema) => (req, res, next) => {
    const data = {};

    if (schema.body) data.body = req.body;
    if (schema.query) data.query = req.query;
    if (schema.params) data.params = req.params;
    if (schema.file) data.file = req.file;

    const { error, value } = joi.object(schema).validate(data, {
        abortEarly: false,
        stripUnknown: true,
        allowUnknown: true
    });

    if (error) {
        return res.status(400).json({
            message: error.details.map(err => err.message),
            status: false
        });
    }

    if (value.body) req.body = value.body;
    if (value.params) req.params = value.params;
    if (value.query) Object.assign(req.query, value.query);
    if (value.file) req.file = value.file;

    next();
};