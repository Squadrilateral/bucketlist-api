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
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Listitem = mongoose.model('Listitem', listitemSchema)

module.exports = Listitem
