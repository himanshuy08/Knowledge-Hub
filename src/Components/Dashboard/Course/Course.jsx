import React, { useState } from 'react';
import { Card, CardImg, CardBody, CardTitle, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Scaffold from '../Scaffold/Scaffold';
import VideoPlayer from '../../../Pages/Admin/VideoPlayer';
import web from '../../../assets/web.png';
import app from '../../../assets/app.png';
import data_science from '../../../assets/data-science.jpg';
import './Course.css';

const Course = () => {
  const courseData = [
    {
      id: '01',
      title: 'Full Stack Web Development Course',
      imgUrl: web,
    },
    {
      id: '02',
      title: 'Android Development Course',
      imgUrl: app,
    },
    {
      id: '03',
      title: 'Data Science Fundamentals Course',
      imgUrl: data_science,
    },
  ];

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setVideoOpen(true);
  };

  const handleVideoClose = () => {
    setSelectedCourse(null); // Reset selected course
    setVideoOpen(false);
  };

  const renderCourseCards = () => {
    return courseData.map((course) => (
      <Card
        key={course.id}
        className="courseCard"
        onClick={() => handleCourseClick(course)}
      >
        <CardImg top width="100%" src={course.imgUrl} alt={course.title} />
        <CardBody>
          <CardTitle>{course.title}</CardTitle>
        </CardBody>
      </Card>
    ));
  };

  return (
    <Scaffold title="Courses" className="courseRoot">
      <div className="courseContainer">{renderCourseCards()}</div>
      <Modal isOpen={videoOpen} toggle={handleVideoClose}>
        <ModalHeader toggle={handleVideoClose}>
          {selectedCourse ? selectedCourse.title : ''}
        </ModalHeader>
        <ModalBody>
          <VideoPlayer onClose={handleVideoClose} />
        </ModalBody>
      </Modal>
    </Scaffold>
  );
};

export default Course;
