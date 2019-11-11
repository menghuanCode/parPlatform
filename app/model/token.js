'use strict'

module.exports = app => {
  const mongoose = app.mongoose
  const { Schema } = mongoose

  const TokenSchema = new Schema({
    name: String,
    access_token: String,
    ticket: String,
    expires_in: Number,
  }, { timestamps: true })

  return mongoose.model('Token', TokenSchema)
}
