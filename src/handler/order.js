class OrderHandler {
    constructor(orderService) {
        this.orderService = orderService;

        this.getAll = this.getAll.bind(this);
    }


    async getAll(req, res) {
        const serviceRes = await this.orderService.getAll()

        // console.log("orders handler", serviceRes)
        res.status(serviceRes.statusCode).send({
            orders: serviceRes.orders
        })
    }


}

module.exports = OrderHandler;