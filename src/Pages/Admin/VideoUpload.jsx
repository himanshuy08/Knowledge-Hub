import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Alert, Container, Row, Col, Label } from "reactstrap";
import { storage, database } from "../../Firebase/firebase";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push, update } from "firebase/database";
import { CircularProgress, LinearProgress } from "@mui/material";
import ScaffoldAdmin from "./ScaffoldAdmin";
import useProtectedRoute from '../../api';
const VideoUpload = () => {
  useProtectedRoute();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("success");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const toggleSnackbar = () => {
    setShowSnackbar(!showSnackbar);
  };

  const handleSnackbar = (message, color) => {
    setSnackbarMessage(message);
    setSnackbarColor(color);
    toggleSnackbar();
  };

  const handleUpload = () => {
    if (title && category && videoFile && imageFile) {
      setUploading(true);

      const videoStorageRef = storageRef(storage, `videos/${videoFile.name}`);
      const videoUploadTask = uploadBytesResumable(videoStorageRef, videoFile);

      videoUploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error(error);
          handleSnackbar("Error uploading video", "danger");
          setUploading(false);
        },
        () => {
          getDownloadURL(videoUploadTask.snapshot.ref)
            .then((videoUrl) => {
              const imageStorageRef = storageRef(storage, `thumbnails/${imageFile.name}`);
              const imageUploadTask = uploadBytesResumable(imageStorageRef, imageFile);

              imageUploadTask.on(
                "state_changed",
                (snapshot) => {
                  // Handle image upload progress if needed
                },
                (error) => {
                  console.error(error);
                  handleSnackbar("Error uploading image", "danger");
                  setUploading(false);
                },
                () => {
                  getDownloadURL(imageUploadTask.snapshot.ref)
                    .then((imageUrl) => {
                      const videoDetails = {
                        title: title,
                        category: category,
                        url: videoUrl,
                        thumbnail: imageUrl,
                      };

                      const videosRef = dbRef(database, "videos");
                      const newVideoRef = push(videosRef);
                      const newVideoKey = newVideoRef.key;
                      const updates = {};
                      updates[`/${newVideoKey}`] = videoDetails;
                      update(videosRef, updates);

                      setTitle("");
                      setCategory("");
                      setVideoFile(null);
                      setImageFile(null);

                      handleSnackbar("Video uploaded successfully", "success");
                      setUploading(false);
                      setUploadProgress(0);
                    })
                    .catch((error) => {
                      console.error(error);
                      handleSnackbar("Error getting image download URL", "danger");
                      setUploading(false);
                    });
                }
              );
            })
            .catch((error) => {
              console.error(error);
              handleSnackbar("Error getting video download URL", "danger");
              setUploading(false);
            });
        }
      );
    } else {
      handleSnackbar("Please fill in all the details", "danger");
    }
  };

  return (
    <ScaffoldAdmin title='Video Upload'>
    <Container className="video-main">
      <Row className="d-flex align-items-center justify-content-center video-content">
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
              <Label className="custom-label">Category</Label>
              <Input
                type="text"
                name="category"
                id="category"
                placeholder="Enter category"
                value={category}
                onChange={handleCategoryChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label className="custom-label">Choose Image File for Thumbnail</Label>
              <Input
                type="file"
                name="imageFile"
                placeholder="Choose Image File"
                id="imageFile"
                onChange={handleImageFileChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label className="custom-label">Choose Video File</Label>
              <Input
                type="file"
                name="videoFile"
                placeholder="Choose Video File"
                id="videoFile"
                onChange={handleVideoFileChange}
                required
              />
            </FormGroup>
            <Button onClick={handleUpload} disabled={uploading}>
              {uploading ? <CircularProgress size={20} /> : "Upload Video"}
            </Button>
            {uploading && (
              <LinearProgress
                variant="determinate"
                value={uploadProgress}
                style={{ marginTop: "10px" }}
              />
            )}
            <Alert color={snackbarColor} isOpen={showSnackbar} toggle={toggleSnackbar}>
              {snackbarMessage}
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
    </ScaffoldAdmin>
  );
};

export default VideoUpload;
