const { Schema, Types, model } = require('mongoose');
const yup = require('yup');

const paintingSchema = Schema({
  title: {
    type: String,
    required: true,
  },
   author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    // default: [],
  },
  imgWall: {
    type: [String],
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: false,
  },
  sizeId: {
    type: Schema.Types.ObjectId,
    ref: 'Size',
    required: false,
  },
}, {
  timestamps: true
});

const paintingValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('Painting.title must be a string')
    .required('Painting.title is required'),
  author: yup
    .string().typeError('Painting.author must be a string')
    .required('Painting.author is required'),
  description: yup
    .string().typeError('Painting.description must be a string')
    .required('Painting.description is required'),
  img: yup
    .string().typeError('Painting.img must be a string'),
  imgWall: yup.array(yup.string().typeError('Painting.imgWall must be a string')),
  price: yup
    .number().typeError('Painting.price must be a number')
    .required('Painting.price is required')
    .positive('Painting.price must be positive'),
  categoryId: yup
    .string().typeError('Painting.categoryId must be a string')
    .test(
      'is-mongo-object-id',
      'Painting.categoryId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    )
    .required('Painting.categoryId is required'),
  sizeId: yup
    .string().typeError('Painting.sizeId must be a string')
    .test(
      'is-mongo-object-id',
      'Painting.sizeId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    )
    .required('Painting.sizeId is required'),
});

const paintingUpdateValidationSchema = yup.object().shape({
  title: yup.string().typeError('Painting.title must be a string'),
  author: yup.string().typeError('Painting.author must be a string'),
  description: yup.string().typeError('Painting.description must be a string'),
  img: yup.string().typeError('Painting.img must be a string'),
  imgWall: yup.array(yup.string().typeError('Painting.imgWall must be a string')),
  price: yup.number()
    .typeError('Painting.price must be a number')
    .positive('Painting.price must be positive'),
  categoryId: yup.string().typeError('Painting.categoryId must be a string')
    .test(
      'is-mongo-object-id',
      'Painting.categoryId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    ),
  sizeId: yup.string().typeError('Painting.sizeId must be a string')
    .test(
      'is-mongo-object-id',
      'Painting.sizeId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    ),
});

paintingSchema.statics.validateData = (paintingData) => paintingValidationSchema.validate(paintingData)
paintingSchema.statics.validateUpdateData = (paintingData) => paintingUpdateValidationSchema.validate(paintingData)

const PaintingModel = model('Painting', paintingSchema);

module.exports = PaintingModel;