const campuses = require('express').Router()
const db = require('../../db')

campuses.get('/', (req, res, next)=> {
  db.model('campus').findAll( { include: [ { model: db.model('student'), order: ['name'] } ], order: [ 'name' ] } )
    .then(campuses=> res.send(campuses))
    .catch(next)
})

campuses.get('/:id', (req, res, next)=> {
  db.model('campus').findById(req.params.id, { include: [ db.model('student') ] } )
    .then(campus=> res.send(campus))
    .catch(next)
})

campuses.post('/', (req, res, next)=> {
  db.model('campus').create(req.body)
    .then(campus=> res.status(203).send(campus))
    .catch(next)
})

campuses.put('/:id', (req, res, next)=> {
  db.model('campus').findById(req.params.id)
    .then(campus=> campus.update(req.body))
    .then(campus=> res.send(campus))
    .catch(next)
})

campuses.delete('/:id', (req, res, next)=> {
  db.model('campus').findById(req.params.id)
    .then(campus=> campus.destroy())
    .then(()=> res.send(200))
    .catch(next)
})

module.exports = campuses
