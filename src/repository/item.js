const { item: ItemModel, user: UserModel } = require('../../models')

class ItemRepository {
    constructor() {}

    async findAll() {
        const itemList = await ItemModel.findAll({
            include: [{
                    model: UserModel,
                    required: true,
                    as: "user"
                }

            ]
        });

        return itemList;
    }

    async insert(item) {
        const createdItem = await ItemModel.create({
            user_id: item.user_id,
            title: item.title,
            description: item.description,
            price: item.price,
            stock: item.stock,
            img_url: item.img_url
        });

        return createdItem;
    }


}

module.exports = ItemRepository;