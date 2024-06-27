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


}

module.exports = OrderRepository;