'use strict'

module.exports = app => {
  const mongoose = app.mongoose
  const { Schema } = mongoose

  const GoodsSchema = new Schema({
    avatar_url: { type: String },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: String, required: true },
    shopId: { type: String, required: true },
  })

  return mongoose.model('Goods', GoodsSchema)
}
