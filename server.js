const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS for all requests
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Product data
const products = [
    { id: 1, name: 'Casual T-Shirts', price: 78, brand: 'Arrow', image: '/img/f1.jpeg',rating:4},
    { id: 2, name: 'Halfsleeve T-Shirts', price: 80, brand: 'Allen', image: '/img/f2.jpeg',rating:5},
    { id: 3, name: 'Slim Fit T-Shirts', price: 75, brand: 'Roadster', image: '/img/f3.jpeg',rating:3},
    { id: 4, name: 'Simple T-Shirts', price: 85, brand: 'Peter', image: '/img/f4.jpeg',rating:4},
    { id: 5, name: 'Colorful T-Shirts', price: 95, brand: 'Raymond', image: '/img/f5.jpeg',rating:3},
    { id: 6, name: 'Slim Fit T-Shirts', price: 77, brand: 'Allen', image: '/img/f6.jpeg',rating:4 },
    { id: 7, name: 'Simple T-Shirts', price: 89, brand: 'Louis', image: '/img/f7.jpeg',rating:5 },
    { id: 8, name: 'Printed T-Shirts', price: 92, brand: 'Adidas', image: '/img/f8.jpeg',rating:5},
    { id: 9, name: 'Multicolor T-Shirts', price: 102, brand: 'Blackberry', image: '/img/n6.jpeg',rating:3 },
    { id: 10, name: 'Cotton Shirts', price: 82, brand: 'Roadster', image: '/img/n2.jpeg',rating:4},
];

// API route to get products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// API route to handle orders
app.post('/api/orders', (req, res) => {
    const order = req.body;
    console.log('Order received:', order);
    res.json({ success: true, orderId: Math.random().toString(36).substr(2, 9) });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
