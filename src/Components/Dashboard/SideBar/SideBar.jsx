import React, { useState } from "react";
import "./SideBar.css";
import { NavLink } from "react-router-dom";
import {
  Card,
  Box,
  Divider,
  Typography,
  Stack,
  Avatar,
  IconButton,
  Collapse,
  Button,
} from "@mui/material";
import { ExpandMore, ExpandLess, Logout } from "@mui/icons-material";
import { DashboardOutlined,LibraryBooksOutlined,Bookmark} from '@mui/icons-material';
import { auth } from "../../../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import useProtectedRoute from '../../../api'
const sidebarData = [
    {
      id: 1,
      icon: <DashboardOutlined />,
      text: "Dashboard",
      path:'/dashboard',
      isActive: false,
     
    },
    {
      id: 2,
      icon: <LibraryBooksOutlined  />,
      text: "Courses",
      path:'/courses',
      isActive: false,
    },
    {
      id: 3,
      icon: <Bookmark />,
      text: "Materials",
      path:'/material',
    }
  
  ];
  


const SideBar = () => {
  useProtectedRoute();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const currentPathname = window.location.pathname;
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut(); 
    localStorage.clear();
    navigate("/");
  };
  const currentUser = auth.currentUser; 
  console.log(currentUser);
  return (
    <div className="sidebarRoot">
      {currentUser &&(<Card className="card">
        <Box sx={{ p:3, display: "flex", alignItems: "center" , flexDirection:"row",gap:1}}>
          <Avatar variant="rounded" src={currentUser.photoURL} sx={{ width: 60, height: 60 }}/>
          <Stack spacing={0.5}>
            <Typography fontWeight={500} variant="h6">{currentUser.displayName}</Typography>
          </Stack>
          <IconButton
            onClick={handleCollapse}
            aria-expanded={isCollapsed}
            aria-label="Toggle Collapse"
            size="small"
          >
            {isCollapsed ? <ExpandMore /> : <ExpandLess />}
          </IconButton>
        </Box>
        <Divider />
        <Collapse in={isCollapsed}>
          <Box sx={{ p: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Logout />}
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </Button>
          </Box>
        </Collapse>
      </Card>)}
      <ul className="sidebarUl">
        {sidebarData.map((item) => (
          <NavLink key={item.id} to={item.path} className={`sidebarNavLink ${currentPathname === item.path ? 'active' : ''}`}>
            <li className="sidebarLi">
              {item.icon}
              <span>{item.text}</span>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
