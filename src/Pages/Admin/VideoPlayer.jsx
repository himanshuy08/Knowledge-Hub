import React, { useEffect, useState } from 'react';
import { database } from '../../Firebase/firebase';
import { ref as dbRef,  off, get } from 'firebase/database';
import { Card, CardImg, CardBody, CardTitle, Modal, ModalHeader, ModalBody } from 'reactstrap';
import './videoPlayer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const videosRef = dbRef(database, 'videos');

    const fetchVideos = async () => {
      try {
        const snapshot = await get(videosRef);
        const videos = snapshot.val();
        if (videos) {
          const videoList = Object.values(videos);
          setVideos(videoList);
        }
      } catch (error) {
        console.log('Error fetching videos:', error);
      }
    };

    fetchVideos();

    return () => {
      off(videosRef);
    };
  }, []);

  const handleCardClick = (video) => {
    setSelectedVideo(video);
    setShowPlayer(true);
  };

  const closePlayer = () => {
    setSelectedVideo(null);
    setShowPlayer(false);
   
  };

  const handleVideoClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div>
      <div className="card-container">
        {videos.map((video) => (
          <Card key={video.id} onClick={() => handleCardClick(video)} className="custom-card"> 
            <CardImg top src={video.thumbnail} alt={video.title} className="custom-card-image" /> 
            <CardBody>
              <CardTitle className="custom-card-title text-center">{video.title}</CardTitle> 
            </CardBody>
          </Card>
        ))}
      </div>
      <Modal isOpen={showPlayer} toggle={closePlayer} size="lg">
        <ModalHeader toggle={closePlayer}>{selectedVideo ? selectedVideo.title : ''}</ModalHeader>
        <ModalBody>
          <div className="video-container">
            <video className="custom-video" controls onClick={handleVideoClick}>
              <source src={selectedVideo ? selectedVideo.url : ''} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default VideoPlayer;
