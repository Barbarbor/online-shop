import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import { HOST } from '../constants';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleFileChange = (event : ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            console.error('No file selected.');
            return;
        }
        
        const formData = new FormData();
        formData.append('image', selectedFile?.name);

        try {
            const response = await axios.post(`${HOST}/api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded with ID:', response.data.fileId);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    return (
        <div>FileUpload</div>
    );
}
export default FileUpload;