import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { CircularProgress, LinearProgress } from "@mui/material";
import ScaffoldAdmin from "./ScaffoldAdmin";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as databaseRef, push } from "firebase/database"; // Updated import
import useProtectedRoute from '../../api';
const MaterialAdmin = () => {
  useProtectedRoute();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarColor, setSnackbarColor] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const storage = getStorage();
      const storageReference = storageRef(storage, "materials/" + file.name);
      const uploadTask = uploadBytesResumable(storageReference, file);

      setUploading(true);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          setUploading(false);
          setSnackbarColor("danger");
          setSnackbarMessage("File upload failed");
          setShowSnackbar(true);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const materialData = {
            title: title,
            downloadURL: downloadURL,
          };

          const database = getDatabase(); // Initialize the database
          const databaseReference = databaseRef(database, "materials"); // Get a reference to the "materials" node
          push(databaseReference, materialData)
            .then(() => {
              setUploading(false);
              setSnackbarColor("success");
              setSnackbarMessage("File uploaded successfully");
              setShowSnackbar(true);
              setTitle("");
              setFile(null);
            })
            .catch((error) => {
              console.error("Database update error:", error);
              setUploading(false);
              setSnackbarColor("danger");
              setSnackbarMessage("Failed to save file data");
              setShowSnackbar(true);
            });
        }
      );
    }
  };

  const toggleSnackbar = () => {
    setShowSnackbar(!showSnackbar);
  };

  return (
    <ScaffoldAdmin title="Material Upload">
      <Container className="material-main">
        <Row className="d-flex align-items-center justify-content-center material-content">
          <Col md={12} className="d-flex flex-column">
            <Form className="mt-4">
              <FormGroup>
                <Label className="custom-label">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter title"
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label className="custom-label">File</Label>
                <Input type="file" name="file" id="file" onChange={handleFileChange} required />
              </FormGroup>
              <Button
                className="custom-button mt-4"
                onClick={handleUpload}
                disabled={uploading || !title || !file}
              >
                {uploading ? (
                  <>
                    <CircularProgress size={20} />
                    {"Uploading..."}
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      {uploading && <LinearProgress variant="determinate" value={uploadProgress} />}
      {showSnackbar && (
        <Alert color={snackbarColor} toggle={toggleSnackbar}>
          {snackbarMessage}
        </Alert>
      )}
    </ScaffoldAdmin>
  );
};

export default MaterialAdmin;
