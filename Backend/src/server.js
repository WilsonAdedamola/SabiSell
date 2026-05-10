const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Import Routes
const authRoutes = require('./routes/auth.routes');
const vendorRoutes = require('./routes/vendor.routes');
const productRoutes = require('./routes/product.routes');
const subscriptionRoutes = require('./routes/subscription.routes');
const orderRoutes = require('./routes/order.routes');
const storefrontRoutes = require('./routes/storefront.routes');
const categoryRoutes = require('./routes/category.routes');
const notificationRoutes = require('./routes/notification.routes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/storefront', storefrontRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/notifications', notificationRoutes);

// A simple test route
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ status: 'success', message: 'SabiSell Backend is running!' });
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});