const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Image = require('./Image');

const Superhero = sequelize.define('superhero', {
    nickname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    realName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'real_name'
    },
    originDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'origin_description'
    },
    superpowers: {
        type: DataTypes.JSON
    },
    catchPhrase: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'catch_phrase'
    }
}, {
    tableName: 'superhero',
    timestamps: false
});

Superhero.hasMany(Image, { foreignKey: 'superhero_id' });
Image.belongsTo(Superhero, { foreignKey: 'superhero_id' });


module.exports = Superhero;