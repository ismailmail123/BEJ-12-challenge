const express = require('express');
const app = express();
const PORT = 3000;

// Import dependecy
// Import repository
const UserRepository = require('./src/repository/user');
const ItemRepository = require('./src/repository/item');
const OrderRepository = require('./src/repository/order');


// Import service
const AuthService = require('./src/service/auth');
const UserService = require('./src/service/user');
const ItemService = require('./src/service/item');
const OrderService = require('./src/service/order');

// Import handler
const AuthHandler = require('./src/handler/auth');
const UserHandler = require('./src/handler/user');
const ItemHandler = require('./src/handler/item');
const OrderHandler = require('./src/handler/order');

app.use(express.json());

//user
const userRepository = new UserRepository();
const userService = new UserService(userRepository)
const userHandler = new UserHandler(userService);

//Auth
const authService = new AuthService(userRepository);
const authHandler = new AuthHandler(authService);

//Item
const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository, userRepository)
const itemHandler = new ItemHandler(itemService);

//Order
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository, itemRepository)
const orderHandler = new OrderHandler(orderService);

// Auth 
app.post('/auth/login', authHandler.login);
app.post('/auth/register', authHandler.register);



// User
app.get('/users', userHandler.getAll);
app.get('/users/:email', userHandler.getByEmail);

//product
app.get('/items', itemHandler.getAll);
app.post('/items', itemHandler.add);
app.put('/items/:id', itemHandler.update);
app.delete('/items/:id', itemHandler.remove);

//order
app.get('/orders', orderHandler.getAll);
app.post('/orders', orderHandler.add);
app.put('/orders/:id', orderHandler.update);
app.delete('/orders/:id', orderHandler.remove);

app.use((req, res, next) => {
    res.status(404).send({
        status: "fail",
        message: "not found"
    })
});

app.listen(PORT, function() {
    console.log(`Server berjalan pada http://localhost:${PORT}`);
});