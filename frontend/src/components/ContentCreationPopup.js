// src/components/ContentCreationPopup.js
import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Box, TextField, Button } from '@mui/material';

const ContentCreationPopup = ({ onClose, onUpload }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [poster, setPoster] = useState(null);

    const imageUrl = {
        filename: poster,
        originalname: 'poster',
        mimetype: 'image/jpeg',
    }
    const handlePosterChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPoster(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title,
            description,
            posterData: imageUrl,
        };
        const response = await axios.post('http://localhost:8000/add', payload);
        onUpload(response.data);
        onClose();
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', width: 400, mt: 10 }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <TextField
                            label="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            fullWidth
                        />
                    </div>
                    <div className="form-group mb-3">
                        <TextField
                            label="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input type="file" onChange={handlePosterChange} required className="form-control" />
                    </div>
                    <div className="d-flex justify-content-between">
                        <Button type="submit" variant="contained" color="primary">Upload</Button>
                        <Button variant="outlined" onClick={onClose}>Close</Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};

export default ContentCreationPopup;
