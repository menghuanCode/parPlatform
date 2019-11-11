'use strict'

module.exports = app => {
  const mongoose = app.mongoose
  const { Schema, model } = mongoose

  const OrdersSchema = new Schema({
    __v: { type: Number, select: false },
    status: { type: [ String, Number ], enum: [ 0, 1, 2, 3, 4 ], default: 0, required: true },
    shop: { type: Schema.Types.ObjectId, ref: 'Shops' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    goods: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Goods' }],
    },
  }, { timestamps: true })


  return model('Orders', OrdersSchema)
}
