const { Schema, model } = require('mongoose');
const yup = require('yup');

const sizeSchema = Schema({
  title: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const sizeValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('Size.title must be a string')
    .required('Size.title is required')
});

const sizeUpdateValidationSchema = yup.object().shape({
  title: yup.string().typeError('Size.title must be a string')
});

sizeSchema.statics.validateData = (sizeData) => sizeValidationSchema.validate(sizeData)
sizeSchema.statics.validateUpdateData = (sizeData) => sizeUpdateValidationSchema.validate(sizeData)

const SizeModel = model('Size', sizeSchema);

module.exports = SizeModel;