'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER
            },
            item_id: {
                type: Sequelize.INTEGER
            },
            order_date: {
                type: Sequelize.DATE
            },
            address: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            total_price: {
                type: Sequelize.DECIMAL
            },
            status: {
                type: Sequelize.STRING
            },
            created_at: {
                allowNull: false,
                defaultValue: Sequelize.fn("NOW"),
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                defaultValue: Sequelize.fn("NOW"),
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('orders');
    }
};