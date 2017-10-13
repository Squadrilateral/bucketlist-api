'use strict'

const mongoose = require('mongoose')

const yelpresultSchema = new mongoose.Schema({
  term: {
    type: String
  },
  location: {
    type: String
  }
})

const Yelpresult = mongoose.model('Yelpresult', yelpresultSchema)

module.exports = Yelpresult
