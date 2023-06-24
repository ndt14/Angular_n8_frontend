import * as Joi from 'joi';

export const signupSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name không được bỏ trống',
        'any.required': 'Name là trường bắt buộc',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Trường email không được để trống',
        'string.email': 'Email không đúng định dạng',
        'any.required': 'Trường email là bắt buộc',
    }),
    password: Joi.string().required().min(6).messages({
        'any.empty': 'Trường mật khẩu không được để trống',
        'string.min': 'Trường mật khẩu cần ít nhất 6 ký tự',
        'any.required': 'Trường mật khẩu là bắt buộc',
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        'any.empty': 'Trường xác nhận mật khẩu không được để trống',
        'any.valid': 'Mật khẩu không khớp',
        'any.required': 'Trường xác nhận mật khẩu là bắt buộc',
    }),
});
