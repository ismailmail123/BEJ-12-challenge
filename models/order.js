'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            order.belongsTo(models.user, {
                foreignKey: "user_id",
                as: "user"
            })
            order.belongsTo(models.item, {
                foreignKey: "item_id",
                as: "item"
            })
        }
    }
    order.init({
        user_id: DataTypes.INTEGER,
        item_id: DataTypes.INTEGER,
        order_date: DataTypes.DATE,
        address: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        total_price: DataTypes.DECIMAL,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'order',
        underscored: true
    });
    return order;
};