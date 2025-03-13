// server.js
const express = require('express');
const config = require('./config');
const sequelize = require('./database');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/api/status', (req, res) => {
    res.json({ status: 'online', message: 'Express.js is running!' });
});

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(config.port, async () => {
    console.log(`Server is running on port ${config.port}`);
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
});