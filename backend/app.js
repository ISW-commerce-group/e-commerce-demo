const express = require('express');
const app = express();
app.disable('x-powered-by');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorMiddleware.js');

app.use(express.json());

// rutas
app.use('/api/users', userRoutes);


app.use(errorHandler);

module.exports = app;