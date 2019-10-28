'use strict'

module.exports = app => {
  const mongoose = app.mongoose
  const { Schema } = mongoose

  const TokenSchema = new Schema({
    name: String,
    access_token: String,
    ticket: String,
    expires_in: Number,
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

  TokenSchema.pre('save', function(next) {
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
      this.meta.updateAt = Date.now()
    }
    next()
  })


  return mongoose.model('Token', TokenSchema)
}