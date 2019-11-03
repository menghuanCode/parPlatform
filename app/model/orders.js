'use strict'

module.exports = app => {
  const mongoose = app.mongoose
  const { Schema, model } = mongoose

  const OrdersSchema = new Schema({
    __v: { type: Number, select: false },
    shop: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Shop' }],
    },
    user: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    goods: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Goods' }],
    },
    meta: {
      createAt: {
        type: Date,
        default: Date.now(),
      },
      updateAt: {
        type: Date,
        default: Date.now(),
      },
    },
  })

  OrdersSchema.pre('save', function(next) {
    console.log(this.isNew)
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
      this.meta.updateAt = Date.now()
    }
    next()
  })

  return model('Orders', OrdersSchema)
}
