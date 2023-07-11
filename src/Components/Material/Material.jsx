import React, { useEffect, useState } from 'react';
import Scaffold from '../Dashboard/Scaffold/Scaffold';
import { getDatabase, ref as databaseRef, onValue, off } from 'firebase/database';
import { Card, CardContent, CardActions, CardHeader, Button, Modal, Typography } from '@mui/material';
import './Material.css'; 

const Material = () => {
  const [materials, setMaterials] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', downloadURL: '' });

  useEffect(() => {
    const database = getDatabase();
    const materialsRef = databaseRef(database, 'materials');

    const materialsListener = onValue(materialsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const materialList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMaterials(materialList);
      }
    });

    return () => {
      // Clean up the event listener when component unmounts
      off(materialsRef, materialsListener);
    };
  }, []);

  const handleOpenModal = (material) => {
    setModalContent(material);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Scaffold title="Material">
      <div className="material-cards">
        {materials.map((material) => (
          <Card key={material.id} className="material-card">
            <CardHeader title={material.title} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                A Comprehensive HTML Introduction and Cheat sheet.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleOpenModal(material)}>
                View
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="modal-body">
          <Typography variant="h5">{modalContent.title}</Typography>
          <Typography variant="body1">
            <a href={modalContent.downloadURL} target="_blank" rel="noreferrer">
              Download
            </a>
          </Typography>
        </div>
      </Modal>
    </Scaffold>
  );
};

export default Material;
