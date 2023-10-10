const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 3001;

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
app.get('/api', (req, res) => {
    res.send('Server is working');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
