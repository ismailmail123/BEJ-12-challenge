const { order: OrderModel, user: UserModel, item: ItemModel } = require('../../models')

class OrderRepository {
    constructor() {}

    async findAll() {
        const orderList = await OrderModel.findAll({
            include: [{
                    model: UserModel,
                    required: true,
                    as: "user",
                    // attributes: ['name']
                },
                {
                    model: ItemModel,
                    required: true,
                    as: "item"
                }
            ]
        });

        return orderList;
    }

    async findById(orderId) {
        const order = await OrderModel.findByPk(orderId);
        return order;
    }

    async insert(order) {

        const createdOrder = await OrderModel.create({
            user_id: order.user_id,
            item_id: order.item_id,
            order_date: new Date(),
            address: order.address,
            quantity: order.quantity,
            total_price: order.total_price,
            status: order.status
        });

        return createdOrder;
    }

    async update(orderId, item) {
        if (!item) {
            throw new Error('Invalid item data');
        }
        const updatedOrder = await OrderModel.update({
            status: item.status,

        }, {
            where: {
                id: orderId
            }
        });

        return updatedOrder;
    }

    async remove(orderId) {

        const deletedOrder = await OrderModel.destroy({
            where: {
                id: orderId
            }
        });

        console.log("ini order id", deletedOrder)

        if (!deletedOrder) {
            throw new Error('Item tidak ditemukan');
        }

        return deletedOrder;

    }



}

module.exports = OrderRepository;