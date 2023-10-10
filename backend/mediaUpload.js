
const express = require('express');
const path = require('path');
const multer = require('multer');

const mediaUploadRouter = express.Router();

// Configure storage for uploaded files using Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../frontend/public/pics'));
    },
    filename: (req, file, cb) => {
        // Generate a unique filename
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });

// Define a route for file uploads
mediaUploadRouter.post('/upload', upload.single('productImage'), (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // File has been uploaded, and you can now store its path in the database or use it as needed
        const filePath = path.join(__dirname, '../frontend/public/pics', req.file.filename);

        // Save `filePath` in the database or return it in the API response
        const photoUrl = `/pics/${req.file.filename}`;

        // Return the photo URL in the response
        res.json({ photoUrl });
    } catch (error) {
        // Handle errors
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
});

module.exports = mediaUploadRouter;