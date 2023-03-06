const yup = require("yup");


const linkSchema = yup.object({
    body: yup.object({
        company_name: yup.string().required(),
        is_private: yup.boolean().notRequired(),
        username: yup.string().min(3).required(),
        password: yup.string().min(6).required()
    }),
});




module.exports = linkSchema;