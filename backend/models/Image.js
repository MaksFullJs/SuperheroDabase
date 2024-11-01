const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Image = sequelize.define('Image', {
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    superheroId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'superhero_id'
    }
}, {
    tableName: 'superhero_image',
    timestamps: false
});

module.exports = Image;