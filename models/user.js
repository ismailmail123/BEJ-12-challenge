'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            user.hasMany(models.item, {
                foreignKey: "user_id",
                as: "item"
            })
            user.hasMany(models.order, {
                foreignKey: "user_id",
                as: "order"
            })
        }
    }
    user.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        address: DataTypes.STRING,
        role: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'user',
        underscored: true
    });
    return user;
};