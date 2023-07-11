import React from 'react';
import './Dashboard.css';
import Scaffold from '../Scaffold/Scaffold';
import { auth } from '../../../Firebase/firebase';
import bannerImg from '../../../assets/banner.png';
import useProtectedRoute from '../../../api';
import { Typography } from '@mui/material';

const Dashboard = () => {
  useProtectedRoute();
  const currentUser = auth.currentUser;

  return (
    <Scaffold title="Dashboard" className="dashboardRoot">
      {currentUser && (
        <div className="dashboard-banner">
          <div className="banner-text">
            <h2 className="dashboard-banner-title">Hello, {currentUser.displayName}</h2>
            <p className="dashboard-banner-subtitle">
              Learn anything, anywhere. Improve your knowledge with flexible, online classes.
            </p>
          </div>
          <img src={bannerImg} alt="Banner" className="banner-img" />
        </div>
      )}

      {
        !currentUser && (
          <Typography variant='h4'>Please Login Bro</Typography>
        )
      }

   
    </Scaffold>
  );
};

export default Dashboard;
