'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Listitem = models.listitem

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  // const listitem = Object.assign(req.body.listitem, {
  //   _owner: req.user._id
  // })
  // console.log('listitem is in index =', listitem)
  console.log('req.user_id index =', req.user._id)
  Listitem.find({
    '_owner': req.user._id
  })
    .then(listitems => {
      res.json({
        listitems: listitems.map((e) =>
          e.toJSON({
            virtuals: true,
            user: req.user
          }))
      })
    })
    .catch(next)
}

const show = (req, res) => {
  res.json({
    listitem: req.listitem.toJSON({
      virtuals: true,
      user: req.user
    })
  })
}

const create = (req, res, next) => {
  const listitem = Object.assign(req.body.listitem, {
    _owner: req.user._id
  })
  Listitem.create(listitem)
    .then(listitem =>
      res.status(201)
      .json({
        listitem: listitem.toJSON({
          virtuals: true,
          user: req.user
        })
      }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body.listitem._owner // disallow owner reassignment.
  req.listitem.update(req.body.listitem)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.listitem.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, {
  before: [{
      method: setUser,
      only: ['index', 'show']
    },
    {
      method: authenticate,
      except: ['index', 'show']
    },
    {
      method: setModel(Listitem),
      only: ['show']
    },
    {
      method: setModel(Listitem, {
        forUser: true
      }),
      only: ['update', 'destroy']
    }
  ]
})
