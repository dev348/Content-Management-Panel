import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const ContentGallery = ({ newPoster }) => {
    const [posters, setPosters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchPosters = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/poster?page=${currentPage}`);
                setPosters(response.data.posts);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching posters:', error);
            }
        };
        fetchPosters();
    }, [newPoster, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mt-5">
            <h1>Content Gallery</h1>
            <Grid container spacing={4}>
                {posters.map(poster => (
                    <Grid item key={poster._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={poster.poster.filename} // Assuming `poster.poster.filename` is the correct path to the image
                                alt={poster.title}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {poster.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {poster.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Created By: {poster.createdBy}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Created At: {new Date(poster.createdAt).toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ContentGallery;
