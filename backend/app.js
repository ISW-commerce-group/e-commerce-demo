const express = require('express');
const app = express();
app.disable('x-powered-by');

const pedidos_routes = require('./routes/pedidos_routes');
const detalle_pedidos_routes = require('./routes/detalle_pedidos_routes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorMiddleware.js');

app.use(express.json());

// rutas
app.use('/api/users', userRoutes);
app.use('/api/pedidos', pedidos_routes);
app.use('/api/pedidos/:pedido_id/detalles', detalle_pedidos_routes);
app.use(errorHandler);

module.exports = app;