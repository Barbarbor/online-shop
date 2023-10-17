const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');

const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3001;
const jwtAuth = require('./auth/authMiddleware');
const authRoutes = require('./Routes/authRoutes');
const loginRoutes = require('./Routes/loginRoutes');
const registrationRoutes = require('./Routes/registrationRoutes');

// Import your API routes
const cartitemRoutes = require('./Routes/cartitemRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');
const likeRoutes = require('./Routes/likeRoutes');
const orderitemRoutes = require('./Routes/orderitemRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const productRoutes = require('./Routes/productRoutes');
const subcategoryRoutes = require('./Routes/subcategoryRoutes');
const userRoutes = require('./Routes/userRoutes');
const mediaUploadRouter = require('./mediaUpload');

// Start the server

const uploadRoutes = require('./Routes/uploadRoutes');
// Start the server
app.use('/auth', authRoutes);
app.use('/auth', loginRoutes);
app.use('/auth', registrationRoutes);

// Protected route with JWT authentication
app.get('/api/protected', jwtAuth, (req, res) => {
    // Only authenticated users can access this route
    res.json({ message: 'Protected route', user: req.user });
});


app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(fileUpload({}));
app.use(express.json());
app.use(cors());

app.use('/api',mediaUploadRouter);


app.use('/api',productRoutes);
app.use('/api',cartitemRoutes);
app.use('/api',orderitemRoutes);
app.use('/api',orderRoutes);
app.use('/api',likeRoutes);
app.use('/api',categoryRoutes);
app.use('/api',subcategoryRoutes);
app.use('/api',userRoutes);

app.use('/api',uploadRoutes);

app.get('/api', (req, res) => {
    res.send('Server is working');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
