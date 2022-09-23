const { Schema, model } = require('mongoose');
const yup = require('yup');

const categorySchema = Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const categoryValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('Category.title must be a string')
    .required('Category.title is required'),
  image: yup
    .string().typeError('Category.image must be a string')
    .required('Category.image is required'),
});

const categoryUpdateValidationSchema = yup.object().shape({
  title: yup.string().typeError('Category.title must be a string'),
  image: yup.string().typeError('Category.image must be a string')
});

categorySchema.statics.validateData = (categoryData) => categoryValidationSchema.validate(categoryData)
categorySchema.statics.validateUpdateData = (categoryData) => categoryUpdateValidationSchema.validate(categoryData)

const CategoryModel = model('Category', categorySchema);

module.exports = CategoryModel;