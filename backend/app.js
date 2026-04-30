const express = require('express');
const app = express();
app.disable('x-powered-by');
const userRoutes = require('./routes/user_routes.js');
const productRoutes = require('./routes/product_routes.js');
const errorHandler = require('./middleware/error_middleware.js');

app.use(express.json());

// rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;