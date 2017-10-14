'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Yelpresult = models.yelpresult

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const yelp = require('yelp-fusion')

const index = (req, res, next) => {
  const clientId = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET
  yelp.accessToken(clientId, clientSecret)
    .then(result => {
      const client = yelp.client(result.jsonBody.access_token)

      client.search({
        term: req.query.term,
        location: req.query.location
      })
      .then(result => {
        const yelpresults = result.jsonBody.businesses
        res.json({
          yelpresults: yelpresults
        })
      })
      .catch(() => res.sendStatus(400))
    })
    .catch(() => res.sendStatus(400))
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
