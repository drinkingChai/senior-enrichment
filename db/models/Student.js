'use strict'

const conn = require('../index')

const Student = conn.define('student', {
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  email: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  }
})

module.exports = Student
