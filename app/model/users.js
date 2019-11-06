'use strict'

module.exports = app => {
  const mongoose = app.mongoose
  const { Schema, model } = mongoose

  const UsersSchema = new Schema({
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    account: { type: String, required: true },
    password: { type: String, required: true, select: false },
    shop: { type: Schema.Types.ObjectId, ref: 'Shops' },
    orders: { type: [{ type: Schema.Types.ObjectId, ref: 'Orders' }], select: false },
  })

  return model('Users', UsersSchema)
}
