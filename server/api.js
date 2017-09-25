'use strict'
const api = require('express').Router()
const db = require('../db')

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}))

// refactor
api.get('/campuses', (req, res, next)=> {
  db.model('campus').findAll( { include: [ db.model('student') ] } )
  .then(campuses=> res.send(campuses))
})

api.get('/campuses/:id', (req, res, next)=> {
  db.model('campus').findById(req.params.id, { include: [ db.model('student') ] } )
  .then(campus=> res.send(campus))
})

api.post('/campuses', (req, res, next)=> {
  db.model('campus').create(req.body)
    .then(campus=> res.status(203).send(campus))
})

api.put('/campuses/:id', (req, res, next)=> {
  db.model('campus').findById(req.params.id)
    .then(campus=> campus.update(req.body))
    .then(campus=> res.send(campus))
})

api.get('/students', (req, res, next)=> {
  db.model('student').findAll( { include: [ db.model('campus') ] } )
  .then(students=> res.send(students))
})

api.post('/students', (req, res, next)=> {
  db.model('student').create(req.body)
    .then(student=> res.status(203).send(student))
})

api.get('/students/:id', (req, res, next)=> {
  db.model('student').findById(req.params.id, { include: [ db.model('campus') ] } )
    .then(student=> res.send(student))
})

api.put('/students/:id', (req, res, next)=> {
  db.model('student').findById(req.params.id)
    .then(student=> student.update(req.body))
    .then(student=> res.send(student))
})

api.delete('/students/:id', (req, res, next)=> {
  db.model('student').findById(req.params.id)
    .then(student=> student.destroy())
    .then(student=> res.status(200).send(student))
})

module.exports = api
