const { Schema, Types, model } = require('mongoose');
const yup = require('yup');

const cupSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

const cupValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('Cup.title must be a string')
    .required('Cup.title is required'),
  description: yup
    .string().typeError('Cup.description must be a string')
    .required('Cup.description is required'),
  categoryId: yup
    .string().typeError('Cup.categoryId must be a string')
    .test(
      'is-mongo-object-id',
      'Cup.categoryId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    )
    .required('Cup.categoryId is required'),
  images: yup.array(yup.string().typeError('Cup.img must be a string')),
  price: yup
    .number().typeError('Cup.price must be a number')
    .required('Cup.price is required')
    .positive('Cup.price must be positive')
});

const cupUpdateValidationSchema = yup.object().shape({
  title: yup.string().typeError('Cup.title must be a string'),
  description: yup.string().typeError('Cup.description must be a string'),
  categoryId: yup.string().typeError('Cup.categoryId must be a string')
    .test(
      'is-mongo-object-id',
      'Cup.categoryId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    ),
  images: yup.array(yup.string().typeError('Cup.img must be a string')),
  price: yup.number()
    .typeError('Cup.price must be a number')
    .positive('Cup.price must be positive'),
});

cupSchema.statics.validateData = (cupData) => cupValidationSchema.validate(cupData)
cupSchema.statics.validateUpdateData = (cupData) => cupUpdateValidationSchema.validate(cupData)

const CupModel = model('Cup', cupSchema);

module.exports = CupModel;