const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/authRoutes');
const tokenVerificationRoute = require('./Routes/tokenVerificationRoute');

const cartitemRoutes = require('./Routes/cartitemRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');
const likeRoutes = require('./Routes/likeRoutes');
const orderitemRoutes = require('./Routes/orderitemRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const productRoutes = require('./Routes/productRoutes');
const subcategoryRoutes = require('./Routes/subcategoryRoutes');
const userRoutes = require('./Routes/userRoutes');
const searchRoutes = require('./Routes/searchRoutes');
// Start the server
// Start the server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/auth', tokenVerificationRoute);

app.use('/api',productRoutes);
app.use('/api',cartitemRoutes);
app.use('/api',orderitemRoutes);
app.use('/api',orderRoutes);
app.use('/api',likeRoutes);
app.use('/api',categoryRoutes);
app.use('/api',subcategoryRoutes);
app.use('/api',userRoutes);
app.use('/api',searchRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
