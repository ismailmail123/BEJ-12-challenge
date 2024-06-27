class ItemHandler {
    constructor(itemService) {
        this.itemService = itemService;

        this.getAll = this.getAll.bind(this);
        this.add = this.add.bind(this);
    }


    async getAll(req, res) {
        const serviceRes = await this.itemService.getAll()


        res.status(serviceRes.statusCode).send({
            items: serviceRes.items
        })
    }

    async add(req, res) {
        const payload = req.body;

        try {
            const serviceRes = await this.itemService.add(payload);
            // console.log("service user", serviceRes);

            if (serviceRes.statusCode === 404) {
                return res.status(404).send({
                    message: serviceRes.message
                });
            }

            if (serviceRes.statusCode === 201) {
                return res.status(201).send({
                    created_item: serviceRes.createdItem
                });
            }

            return res.status(serviceRes.statusCode).send({
                message: serviceRes.message
            });

        } catch (err) {
            console.error("Error during item creation:", err);
            return res.status(500).send({
                message: "Internal server error"
            });
        }
    }


}

module.exports = ItemHandler;