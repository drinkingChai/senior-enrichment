const Campus = require('./models/Campus')
const Student = require('./models/Student')

const seed = ()=> {
  return Promise.all([
    Campus.create({ name: 'Luna' }),
    Campus.create({ name: 'Terra' }),
    Campus.create({ name: 'Mars' }),
    Campus.create({ name: 'Titan' }),
    Student.create({ name: 'Gabe', email: 'gabe@iheartjupiter.com' }),
    Student.create({ name: 'Ashi', email: 'ashi@iheartjupiter.com' }),
    Student.create({ name: 'Dan', email: 'dan@earthishome.com' }),
    Student.create({ name: 'Marvin', email: 'mars@godofwar.com' }),
    Student.create({ name: 'Stinky', email: 'stinky@moonbase.com' })
  ])
  .then(([luna, terra, mars, titan, gabe, ashi, dan, marvin, stinky])=> {
    return Promise.all([
      titan.addStudent(gabe),
      titan.addStudent(ashi),
      terra.addStudent(dan),
      mars.addStudent(marvin),
      luna.addStudent(stinky)
    ])
  })
}

module.exports = seed
