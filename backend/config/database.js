const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nnj_test_task', 'root', 'mokachino41', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;