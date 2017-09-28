const students = require('express').Router()
const db = require('../../db')

students.get('/', (req, res, next)=> {
  db.model('student').findAll( { include: [ db.model('campus') ], order: [ 'name' ] } )
    .then(students=> res.send(students))
    .catch(next)
})

students.post('/', (req, res, next)=> {
  db.model('student').create(req.body)
    .then(student=> res.status(203).send(student))
    .catch(next)
})

students.get('/:id', (req, res, next)=> {
  db.model('student').findById(req.params.id, { include: [ db.model('campus') ] } )
    .then(student=> res.send(student))
    .catch(next)
})

students.put('/:id', (req, res, next)=> {
  db.model('student').findById(req.params.id)
    .then(student=> student.update(req.body))
    .then(student=> res.send(student))
    .catch(next)
})

students.delete('/:id', (req, res, next)=> {
  db.model('student').findById(req.params.id)
    .then(student=> student.destroy())
    .then(student=> res.status(200).send(student))
    .catch(next)
})

module.exports = students
