'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            item.belongsTo(models.user, {
                foreignKey: "user_id",
                as: "user"
            })
            item.hasMany(models.order, {
                foreignKey: "item_id",
                as: "order"
            })
        }
    }
    item.init({
        user_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        stock: DataTypes.INTEGER,
        img_url: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'item',
        underscored: true
    });
    return item;
};