'use strict'

module.exports = app => {
  const mongoose = app.mongoose
  const { Schema, model } = mongoose

  const UsersSchema = new Schema({
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    account: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: { type: Number, default: 0, select: false },
    show: { type: Boolean, default: true, select: false },
  })

  return model('Users', UsersSchema)
}
