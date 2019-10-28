'use strict'

module.exports = app => {
  const mongoose = app.mongoose
  const { Schema } = mongoose

  const GoodsSchema = new Schema({
    avatar_url: { type: String },
    name: { type: String, required: true },
    description: { type: String, select: false },
    categories: { type: String },
    price: { type: String, required: true },
    box_price: { type: String, required: true },
    stock: { type: String, required: true },
  })

  return mongoose.model('Goods', GoodsSchema)
}