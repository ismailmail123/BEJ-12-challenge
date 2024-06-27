class ItemService {
    constructor(itemRepository, userRepository) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    async getAll() {
        try {
            const itemList = await this.itemRepository.findAll()

            return {
                statusCode: 200,
                items: itemList
            }
        } catch (err) {

            return {
                statusCode: 500,
                createdItem: null
            }
        }
    }

    async add({ user_id, title, description, price, stock, img_url }) {
        try {
            // Cek apakah user_id ada
            const userExist = await this.userRepository.getById(user_id);

            if (!userExist) {
                return {
                    statusCode: 404, // Not Found status code
                    message: "User ID tidak ditemukan"
                };
            }


            // Jika tidak ada duplikasi, buat produk
            const createdItem = await this.itemRepository.insert({ user_id, title, description, price, stock, img_url });

            return {
                statusCode: 201, // Created status code
                createdItem: createdItem
            };

        } catch (err) {
            if (err.message.includes('duplicate key value violates unique constraint')) {
                return {
                    statusCode: 409, // Conflict status code
                    message: "Conflict",
                    createdUser: null
                };
            }
            console.error("Error during product creation:", err);
            return {
                statusCode: 500, // Internal Server Error status code
                message: "Internal server error",
                createdItem: null
            };
        }
    }
}

module.exports = ItemService;