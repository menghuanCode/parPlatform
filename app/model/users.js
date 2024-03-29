'use strict'

module.exports = app => {
  const mongoose = app.mongoose
  const { Schema, model } = mongoose

  const UsersSchema = new Schema({
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    account: { type: String, required: true },
    password: { type: String, required: true, select: false },
  }, { timestamps: true })

  return model('Users', UsersSchema)
}
