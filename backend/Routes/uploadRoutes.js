const express = require('express');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const uploadRoutes = express.Router();
const CLIENT_ID = '216258698449-qnsflns7u8h7jhoim784sf0qcgusl03i.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3001/oauth2callback';
const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});
uploadRoutes.get('/auth', (req, res) => {
    const scopes = ['https://www.googleapis.com/auth/drive.file'];
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
    res.redirect(url);
});
uploadRoutes.get('/oauth2callback', async (req, res) => {
    const code = req.query.code;

    try {
        const tokens = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        // Now you have access to Google Drive using the authenticated client.
    } catch (error) {
        console.error('Error getting tokens:', error);
    }
});
uploadRoutes.post('/upload', async (req, res) => {
    try {
        const fileMetadata = {
            name: 'example.jpg',
        };
        const media = {
            mimeType: 'image/jpeg',
            body: req.body.image, // Assume the image data is in the request body
        };

        const uploadedFile = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        });

        res.json({ fileId: uploadedFile.data.id });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
});

module.exports = uploadRoutes;