'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Yelpresult = models.yelpresult

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const yelp = require('yelp-fusion')

const index = (req, response, next) => {
  const clientId = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET
  yelp.accessToken(clientId, clientSecret)
    .then(response => {
      const client = yelp.client(response.jsonBody.access_token)
      client.search({
        term: 'Coffee',
        location: 'boston, ma'
      })
      .then(response => {
        console.log(response.jsonBody.businesses)
      })
      .catch(e => {
        console.log(e)
      })
    })
    .catch(e => {
      console.log(e)
    })
}

const show = (req, res) => {
  res.json({
    yelpresult: req.yelpresult.toJSON({ virtuals: true, user: req.user })
  })
}

module.exports = controller({
  index,
  show
})
