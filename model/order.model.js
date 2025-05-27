import mongoose from 'mongoose'

const orderItmesSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
  },
  quantity: {
    type: Number,
    required: true,
  },
})

const orderSchema = new mongoose.Schema(
  {
    orderPrice: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    orderItmes: [orderItmesSchema],
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Panding', 'Delivered', 'Cancelled'],
      default: 'Panding',
    },
  },

  { timestamps: true }
)

export const Order = mongoose.model('Order', orderSchema)
