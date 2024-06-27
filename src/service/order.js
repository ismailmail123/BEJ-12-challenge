class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    async getAll() {
        try {
            const orderList = await this.orderRepository.findAll()

            return {
                statusCode: 200,
                orders: orderList
            }
        } catch (err) {

            return {
                statusCode: 500,
                createdOrder: null
            }
        }
    }


}

module.exports = OrderService;