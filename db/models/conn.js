const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_NAME, { logging: false })


module.exports = conn
