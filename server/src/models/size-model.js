const { Schema, model } = require('mongoose');
const yup = require('yup');

const sizeSchema = Schema({
  label: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const sizeValidationSchema = yup.object().shape({
  label: yup
    .string().typeError('Size.label must be a string')
    .required('Size.label is required'),
});

const sizeUpdateValidationSchema = yup.object().shape({
  label: yup.string().typeError('Size.label must be a string'),
});

sizeSchema.statics.validateData = (sizeData) => sizeValidationSchema.validate(sizeData)
sizeSchema.statics.validateUpdateData = (sizeData) => sizeUpdateValidationSchema.validate(sizeData)

const SizeModel = model('Size', sizeSchema);

module.exports = SizeModel;