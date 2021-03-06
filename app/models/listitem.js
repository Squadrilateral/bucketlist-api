'use strict'

const mongoose = require('mongoose')

const listitemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: String,
  category: String,
  rating: Number,
  status: String,
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

listitemSchema.virtual('length').get(function length () {
  return this.name.length
})

const Listitem = mongoose.model('Listitem', listitemSchema)

module.exports = Listitem
