'use strict'

const conn = require('../index')

const Campus = conn.define('campus', {
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  address: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  image: conn.Sequelize.STRING
})

module.exports = Campus 
