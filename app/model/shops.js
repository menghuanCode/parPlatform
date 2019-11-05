'use strict'

module.exports = app => {
  const mongoose = app.mongoose
  const { Schema, model } = mongoose

  const ShopsSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    avatar_url: { type: String, required: true },
    shop: { type: Schema.Types.ObjectId, ref: 'Shops' },
    // delivery_fee: { type: Number, required: true, defautl: 0 },
    // minimum_order_amount: { type: Number, required: true, default: 100 },
    // description: { type: String, select: false },
    // slogan: { type: String, select: false },
    // startTime: { type: String, select: false },
    // endTime: { type: String, select: false },
    // business_license: { type: String, select: false },
    // service_license: { type: String, select: false },
  })

  return model('Shops', ShopsSchema)
}
