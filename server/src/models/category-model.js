const { Schema, model } = require('mongoose');
const yup = require('yup');

const categorySchema = Schema({
  label: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const categoryValidationSchema = yup.object().shape({
  label: yup
    .string().typeError('Category.label must be a string')
    .required('Category.label is required'),
});

const categoryUpdateValidationSchema = yup.object().shape({
  label: yup.string().typeError('Category.label must be a string'),
});

categorySchema.statics.validateData = (categoryData) => categoryValidationSchema.validate(categoryData)
categorySchema.statics.validateUpdateData = (categoryData) => categoryUpdateValidationSchema.validate(categoryData)

const CategoryModel = model('Category', categorySchema);

module.exports = CategoryModel;