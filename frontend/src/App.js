import './App.css';
import React, { useState } from 'react';
import ContentGallery from './components/ContentGallery';
import ContentCreationPopup from './components/ContentCreationPopup';
// import { Container, Button } from 'react-bootstrap';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [newPoster, setNewPoster] = useState(null);

  const handleUpload = (poster) => {
      setNewPoster(poster);
  };

  return (
    <container>
    <h1 className="mt-5">Content Management Panel</h1>
    <button variant="primary" onClick={() => setShowPopup(true)}>Upload New Poster</button>
    {showPopup && <ContentCreationPopup onClose={() => setShowPopup(false)} onUpload={handleUpload} />}
    <ContentGallery newPoster={newPoster} />
</container>
  );
}

export default App;
