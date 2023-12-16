const {Sequelize} = require('sequelize');

const sequelize = new Sequelize.Sequelize(
    process.env.SQL_SCHEMA,
    process.env.SQL_USER,
    process.env.SQL_PASSWORD,
    {
        host: process.env.SQL_HOST,
        dialect: 'mysql'
    }
);

exports.sequelize = sequelize;