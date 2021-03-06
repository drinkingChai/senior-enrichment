const db = require('./index')
const Campus = require('./models/Campus')
const Student = require('./models/Student')

const seed = ()=> {
  db.sync({ force: true })
    .then(()=> {
      return Promise.all([
        Campus.create({ name: 'Luna', address: 'Moon base' }),
        Campus.create({ name: 'Terra', address: 'Earth!' }),
        Campus.create({ name: 'Mars', address: 'Dome' }),
        Campus.create({ name: 'Titan', address: 'Jupiter' }),
        Student.create({ name: 'Gabe', email: 'gabe@iheartjupiter.com' }),
        Student.create({ name: 'Ashi', email: 'ashi@iheartjupiter.com' }),
        Student.create({ name: 'Dan', email: 'dan@earthishome.com' }),
        Student.create({ name: 'Marvin', email: 'mars@godofwar.com' }),
        Student.create({ name: 'Stinky', email: 'stinky@moonbase.com' })
      ])
    })
    .then(([luna, terra, mars, titan, gabe, ashi, dan, marvin, stinky])=> {
      return Promise.all([
        titan.addStudent(gabe),
        titan.addStudent(ashi),
        terra.addStudent(dan),
        mars.addStudent(marvin),
        luna.addStudent(stinky)
      ])
    })
    .then(()=> { 
      console.log('database seeded')
      db.close()
    })
}

seed()
